import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.response.use((response) => {
  return response;
}, async (error: AxiosError) => {

  console.error(error)
});

export default api;
