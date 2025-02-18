import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://oinx8slcdw.sharedwithexpose.com/api'
});

export default instance;
