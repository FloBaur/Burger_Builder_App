import axios from 'axios'

const axiosInstance = axios.create({
         baseURL: 'https://react-my-burger-fe2a0.firebaseio.com/'
    }
);

export default axiosInstance;