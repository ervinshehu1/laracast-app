import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://qsgg95ugqr.sharedwithexpose.com/api'
});

export default instance;
