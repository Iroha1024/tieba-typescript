import axios from 'axios';

let url: string = '';
if (process.env.NODE_ENV === 'development') {
    url = '/api';
}
if (process.env.NODE_ENV === 'production') {
    url = 'http://localhost:3000/api';
}

axios.defaults.baseURL = url;

export default axios;
