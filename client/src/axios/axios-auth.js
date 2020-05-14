import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://boisko.herokuapp.com/api/'
});

export default instance;
