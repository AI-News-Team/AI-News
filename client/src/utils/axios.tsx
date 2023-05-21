import axios from "axios";

const port = import.meta.env.VITE_API_PORT;
const host = import.meta.env.VITE_API_HOST;
const api = axios.create({
    baseURL: `http://${host}:${port}`,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getData = async (domain:string, setData:Function) => {
    try {
        const response = await api.get(domain);
        setData(response.data.data)
    } catch (error) {
        console.log(error);
    }
}