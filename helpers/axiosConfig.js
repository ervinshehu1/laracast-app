import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://qelvoobc0z.sharedwithexpose.com/api'
});

export default instance;
