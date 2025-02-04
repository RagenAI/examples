import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // TODO: change to remote url
  headers: {
    'x-api-key': `${process.env.RAGEN_API_KEY}`,
  },
});

export const api = axiosInstance;
