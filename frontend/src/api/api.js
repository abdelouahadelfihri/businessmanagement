import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // your Laravel API base
});

export default api;