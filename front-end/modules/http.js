import axios from "axios"

const { NEXT_PUBLIC_ENDPOINT } = process.env;

export const http = (accessToken) => {
    axios.defaults.baseURL = axios.defaults.baseURL = NEXT_PUBLIC_ENDPOINT || "http://localhost:8000";
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    return axios;
}