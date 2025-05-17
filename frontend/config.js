const config = {
  development: {
    apiUrl: "http://localhost:8001/api",
  },
  production: {
    apiUrl: "https://software-school-genesis.onrender.com/api",
  },
};

const env =
  window.location.hostname === "localhost" ? "development" : "production";

window.API_CONFIG = config[env];
