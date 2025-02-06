import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://hkvthwcxid.sharedwithexpose.com/api'
});

export default instance;
