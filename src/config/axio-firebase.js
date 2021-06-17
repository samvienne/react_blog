import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-blog-f037c-default-rtdb.firebaseio.com/'
});

export default instance;