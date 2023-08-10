import axios from "axios";

const API_PORT = import.meta.env.VITE_API_PORT;
const API_HOST = import.meta.env.VITE_API_HOST;
const API_PROXY = import.meta.env.VITE_API_PROXY;
if (!API_PORT) throw new Error("`API_PORT` is not defined");
if (!API_HOST) throw new Error("`API_HOST` is not defined");
if (!API_PROXY) throw new Error("`API_PROXY` is not defined");

const api = axios.create({
  baseURL: `http://${API_HOST}:${API_PORT}/${
    API_PROXY === "true" ? "api" : ""
  }`,
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
