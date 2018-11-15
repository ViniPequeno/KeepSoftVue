var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', //Base da API
  responseType: 'json',
  responseEncoding: 'utf8',
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Headers':'Content-Type, Authorization, Content-Length, X-Requested-With'
  }
});

module.exports = axiosInstance;