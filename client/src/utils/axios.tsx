import axios from "axios";

const API_PORT = import.meta.env.VITE_API_PORT;
const API_HOST = import.meta.env.VITE_API_HOST;
const API_PROXY = import.meta.env.VITE_API_PROXY;
const API_PROTOCOL = import.meta.env.VITE_API_PROTOCOL;
// if (!API_PORT) throw new Error("`API_PORT` is not defined");
if (!API_HOST) throw new Error("`API_HOST` is not defined");
if (!API_PROXY) throw new Error("`API_PROXY` is not defined");
if (!API_PROTOCOL) throw new Error("`API_PROTOCOL` is not defined");

const port = !!API_PORT ? `:${API_PORT}` : ""; // append colon if port is defined
const proxy = API_PROXY === "true" ? "api" : ""; // append api if proxy is true

const api = axios.create({
  baseURL: `${API_PROTOCOL}://${API_HOST}${port}/${proxy}`,
  headers: { "Content-Type": "application/json" },
});

export const getData = async (domain: string, setData: Function) => {
  console.log(`http://${API_HOST}:${API_PORT}/`);
  try {
    const response = await api.get(domain);
    setData(response.data.data);
  } catch (error) {
    console.log(error);
  }
};
