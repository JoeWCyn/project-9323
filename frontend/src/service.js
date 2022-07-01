import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';
// ADMIN AUTH
export const register = (body) =>
  axios.post(`${BASE_URL}/auth/register`, body);

export const signIn = (body) =>
  axios.post(`${BASE_URL}/auth/login`, body);
export const logOut = (body) =>
  axios.post(`${BASE_URL}/auth/logout`, body);
export const fetchDashboard = () =>
  axios.get('actors');
export const newGuide = (body, token, userId) =>
  axios.post(`${BASE_URL}/article`, body, { headers: { user_id: userId, token: token } });
