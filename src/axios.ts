import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://restaurant-menu-back.onrender.com/api',
});
export default instance;
