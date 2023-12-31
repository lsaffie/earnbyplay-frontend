class Config {
  SERVER_URL = process.env.API_SERVER_URL;
}

const appConfig = new Config();
export default appConfig;