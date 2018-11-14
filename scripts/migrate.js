// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'development';
process.env.PUBLIC_URL = '';

const { exec, execSync } = require('child_process');
const fs = require('fs');
const uuidv4 = require('uuidv4');

// pull db credentials from heroku
process.stdout.write('Pulling credentials from Heroku... ');
const dbRawCreds = execSync(
  'heroku pg:credentials:url postgresql-elliptical-43920 --app sicc-piccs-api'
).toString();
process.stdout.write('done.\n');

process.stdout.write('Compiling database credentials... ');
const dbCreds = Array.from(dbRawCreds.match(/\w+=\S+/g)).reduce(
  (allCredentials, credential) => {
    const [key, value] = credential.split('=');
    allCredentials[key] = value;
    return allCredentials;
  },
  {}
);
process.stdout.write('done.\n');

//  dump existing db schema into new schema file
console.log(dbCreds);
const { host, port, user, dbname, password } = dbCreds;
exec(
  `PGPASSWORD=${password} pg_dump -O -x -h ${host} -p ${port} -U ${user} -d ${dbname} --schema public --schema-only`,
  (_, stdout) => {
    fs.writeFile('./hasura/public-schema.sql', stdout, err => {
      if (err) console.error(err);
    });
  }
);

// TODO: grab metadata from production hasura db
// const migration = uuidv4()
// echo 'endpoint: http://sicc-piccs-api.herokuapp.com' > ./db/config.yaml
// hasura metadata export
// hasura migrate create ${migration}
// const migrationVersion = execSync('find migrations/*.up.sql').split(
//  'migrations/'
// )[1];
// cat public-schema.sql > ./db/migrations/${migrationVersion}.up.sql
// cat metadata.yaml > ,/db/migrations/${migrationVersion}.up.yaml
// echo 'endpoint: http://localhost:8080' > ./db/config.yaml
// docker cp ./db/migrations hasura_graphql-engine_1:/hasura-migrations
// docker stop ${hasura_graphql-engine_1}
// docker-compose up -d
