import axios from "axios"; 

const axiosInstance = axios.create({
  baseURL : import.meta.env.VITE_BACKEND_URL,
  withCredentials:true,
  headers: {
//  Authorization: `<Your Auth Token>`,
    ContentType: "application/json",
  }, 
});

export default axiosInstance;
