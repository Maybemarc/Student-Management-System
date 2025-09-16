import axios from "axios"

const API_URL = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({
    baseURL:API_URL,
    withCredentials:true,
})

export default instance