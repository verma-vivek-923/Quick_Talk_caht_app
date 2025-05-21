import axios from 'axios';
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from 'react'

export const authContext=createContext();

export const AuthProvider = ({children}) => {

const [profile,setProfile]=useState();
const [isAuthen,setIsAuthen]=useState(false);

useEffect(() => {
  const fetchProfile=async ()=>{
    const token = Cookies.get("jwt");
    const islog = localStorage.getItem("user");

    if(!token && !islog){
        console.log("first")
            return 0;
    }

    try {
        const {data}=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/my-profile`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data)
      setProfile(data.user_data)
      setIsAuthen(true)

    } catch (err) {
        console.log(err)
    }
  }
 fetchProfile()
}, [])


return (
    <authContext.Provider
      value={{ profile, isAuthen, setIsAuthen,setProfile}}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);