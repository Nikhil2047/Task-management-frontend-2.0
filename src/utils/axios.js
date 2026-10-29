import axios from "axios";

const instance = axios.create({
    baseURL:"https://task-management-backend-2-0.onrender.com"
})

export default instance;