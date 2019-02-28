const pg = require('pg');
import rds_config from './rds_config';

// We will probably want to import our database credentials as Parameter Store encrypted credentials from the serverless framework.

export async function main(event, context, callback) {

  const connectionString = 'postgresql://' + rds_config.RDS_USERNAME + ':' + rds_config.RDS_PASSWORD + '@' + rds_config.RDS_HOSTNAME + ':' + rds_config.RDS_PORT + '/' + rds_config.RDS_DB_NAME;
  const client = new pg.Client(connectionString);
  client.connect();

  const text = "INSERT INTO cities (name) VALUES ('Seattle')";

  try {
    const result = await client.query(text);
    callback (null, result);
  }

  catch(e) {
    console.log(e);
    callback(null);
  }

  client.end();

};
