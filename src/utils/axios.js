import deafultAxios from 'axios';

const axios = () => deafultAxios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export default axios;
