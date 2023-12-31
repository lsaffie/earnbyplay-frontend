class Config {
  SERVER_URL = process.env.REACT_APP_URL;
}

const appConfig = new Config();
export default appConfig;