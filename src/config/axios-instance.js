import Axios from 'axios';

export const axiosInstance = Axios.create({
    baseURL : "https://hidden-river-10555.herokuapp.com/api/",
})