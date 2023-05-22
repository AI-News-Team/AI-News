import axios from "axios";
import { search } from '../../../server/route/Article/article.search';

const API_PORT = import.meta.env.VITE_API_PORT;
const API_HOST = import.meta.env.VITE_API_HOST;
const api = axios.create({
    baseURL: `http://${API_HOST}:${API_PORT}`,
    headers: { "Content-Type": "application/json", },
});

export const getData = async (domain:string, setData:Function) => {
    try {
        const response = await api.get(domain);
        setData(response.data.data)
    } catch (error) {
        console.log(error);
    }
}