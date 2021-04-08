import axios from 'axios';

const instances = axios.create({
    baseURL: 'https://react-my-buger-39194-default-rtdb.firebaseio.com/'
});

export default instances;
