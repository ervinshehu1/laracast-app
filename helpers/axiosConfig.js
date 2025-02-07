import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://fd6ndfledm.sharedwithexpose.com/api'
});

export default instance;
