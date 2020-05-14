import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://boisko.herokuapp.com/api/'
});

export default instance;
