const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || 27017;
const db = process.env.MONGO_DB || 'mean-test';
const username = process.env.MONGO_USERNAME || '';
const password = process.env.MONGO_PASSWORD || '';
const ssl = process.env.MONGO_SSL || false;
const credentials = username ? `${username}:${encodeURIComponent(password)}@` : '';
const poolSize = process.env.MONGO_POOL_SIZE ? parseInt(process.env.MONGO_PORT_SIZE, 10) : 100;
const environment = process.env.ENV_NAME || 'LOCAL';

const dbConnection = {
  env: environment,
  host,
  dbUrl: (environment !== 'LOCAL')
    ? `mongodb+srv://${credentials}${host}/${db}?retryWrites=true`
    : `mongodb://${credentials}${host}:${port}/${db}?ssl=${ssl}`,
  options: {
    // poolSize, // error here
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
}

export { dbConnection };