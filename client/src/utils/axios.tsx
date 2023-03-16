import axios from "axios";

export const getData = async (domain:string, setData:Function) => {
    try {
        const response = await axios.get(`${domain}article.list`);
        setData(response.data.data)
        }
        catch (error) {
            console.log(error);
        }
    }