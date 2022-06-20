import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

// ADMIN AUTH
export const register = (body) =>
  axios.post(`${BASE_URL}/regitser`, body);

export const signIn = (body) =>
  axios.post(`${BASE_URL}/login`, body);
