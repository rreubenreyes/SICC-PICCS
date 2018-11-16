// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'development';
process.env.PUBLIC_URL = '';

const { exec, execSync } = require('child_process');
const fs = require('fs');
const uuidv4 = require('uuid');

/* helper functions */
const handleError = err => {
  if (err) console.error(err);
};

const changeDbEndpoint = ({ endpoint }) => {
  fs.writeFileSync(
    './hasura/db/config.yaml',
    `endpoint: ${endpoint}`,
    handleError
  );
};

/* change database endpoint to localhost */
changeDbEndpoint({ endpoint: `http://localhost:8080` });
process.stdout.write('Switched to local GraphQL endpoint (port 8080).\n');

/* pull db credentials from heroku */
process.stdout.write('Pulling credentials from Heroku... ');
const dbRawCreds = execSync(
  'heroku pg:credentials:url postgresql-elliptical-43920 --app sicc-piccs-api'
).toString();
process.stdout.write('✅\n');
process.stdout.write('Compiling database credentials... ');
const dbCreds = Array.from(dbRawCreds.match(/\w+=\S+/g)).reduce(
  (allCredentials, credential) => {
    const [key, value] = credential.split('=');
    allCredentials[key] = value;
    return allCredentials;
  },
  {}
);
process.stdout.write('✅\n');

/*  dump existing db schema into new schema file */
process.stdout.write('Dumping public postgres schema... ');
const { host, port, user, dbname, password } = dbCreds;
const postgresDump = execSync(
  `PGPASSWORD=${password} pg_dump -O -x \
  -h ${host} \
  -p ${port} \
  -U ${user} \
  -d ${dbname} \
  --schema public --schema-only
`
);
fs.writeFileSync('./hasura/public-schema.sql', postgresDump, handleError);
process.stdout.write('✅\n');

/* change database endpoint to production */
changeDbEndpoint({ endpoint: `http://sicc-piccs-api.herokuapp.com` });
process.stdout.write('Switched to public GraphQL endpoint.\n');

/* get production metadata */
process.stdout.write('Exporting metadata... ');
execSync('cd ./hasura/db && hasura metadata export');
process.stdout.write('✅\n');

/* make migrations */
process.stdout.write('Generating migration files...\n');
const migrationId = uuidv4();
execSync(`cd ./hasura/db && hasura migrate create ${migrationId}`);
const migration = execSync('find ./hasura/db/migrations/*.up.sql')
  .toString()
  .split('migrations/')[1]
  .split('.')[0];
process.stdout.write('✅\n');

/* write schema file to migrations */
process.stdout.write('Generating migration files...');
const schemaFileContents = execSync(`cat ./hasura/public-schema.sql`);
fs.writeFileSync(
  `./hasura/db/migrations/${migration}.up.sql`,
  schemaFileContents,
  handleError
);

/* write metadata file to migrations */
const metadataFileContents = execSync(
  `cat ./hasura/db/migrations/metadata.yaml`
);
fs.writeFileSync(
  `./hasura/db/migrations/${migration}.up.yaml`,
  metadataFileContents,
  handleError
);
process.stdout.write('✅\n');

/* change back to localhost */
changeDbEndpoint({ endpoint: `http://localhost:8080` });
process.stdout.write('Switched to local GraphQL endpoint (port 8080).\n');

/* apply migrations */
execSync('cd ./hasura/db && hasura migrate apply');
