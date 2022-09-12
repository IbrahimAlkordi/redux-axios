import {createStore, applyMiddleware} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
 
const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL:'http://34.245.213.76:3000',
  responseType: 'json'
});
 
let store = createStore(
  reducers, //custom reducers
  applyMiddleware(
    //all middlewares

    axiosMiddleware(client), //second parameter options can optionally contain onSuccess, onError, onComplete, successSuffix, errorSuffix

  ))