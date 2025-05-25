import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-projectakhir-122089089856.us-central1.run.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
