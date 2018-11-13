// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'development';
process.env.PUBLIC_URL = '';

const { execSync } = require('child_process');
const uuidv4 = require('uuid/v4');

// pull db credentials from heroku
const dbRawCreds = execSync(
  'heroku pg:credentials:url postgresql-elliptical-43920'
);
const dbCreds = Array.from(dbRawCreds.match(/\w+=\S+/g)).reduce(
  (allCredentials, credential) => {
    const [key, value] = credential.split('=');
    allCredentials[key] = value;
    return allCredentials;
  },
  {}
);

// dump existing db schema into new schema file
const { host, port, user, dbname } = dbCreds;
execSync(
  `pg_dump -O -x -h ${host} -p ${port} -U ${user} -d ${dbname} --schema public --schema-only > public-schema.sql`
);

// TODO: export hasura metadata from production db

// splice schema and metadata content to migrations folder
const randomMigrationName = uuidv4();
execSync(`hasura migrate create ${randomMigrationName}`);

const migrationVersion = execSync('find migrations/*.up.sql').split(
  'migrations/'
)[1];
execSync(
  `cat public-schema.sql > migrations/${migrationVersion}_${randomMigrationName}.up.sql`
);
execSync(
  `cat metadata.yaml > migrations/${migrationVersion}_${randomMigrationName}.up.yaml`
); // TODO
execSync(
  `rm -rf migrations/${migrationVersion}.down.sql migrations/${migrationVersion}.down.yaml`
);

// from this point, user must go into Hasura console and manually track migrations
