import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://7klxnxu6hc.sharedwithexpose.com/api'
});

export default instance;
