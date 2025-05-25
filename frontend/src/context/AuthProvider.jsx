import axios from 'axios';
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from 'react'

export const authContext=createContext();

export const AuthProvider = ({children}) => {

const [profile,setProfile]=useState();
const [isAuthen,setIsAuthen]=useState(false);
const [loading,setLoading]=useState(true)

useEffect(() => {
  const fetchProfile=async ()=>{
    const token = Cookies.get("jwt");
    const islog = localStorage.getItem("user");

    if(!token && !islog){
        // console.log("first")
        setLoading(false)
            return 0;
    }

    try {
      // setLoading(true)
        const {data}=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/my-profile`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(data)
      setProfile(data.user_data)
      setIsAuthen(true)
        setLoading(false)
    } catch (err) {
        console.log(err)
        setLoading(false)
    }
  }
 fetchProfile()
}, [])


return (
    <authContext.Provider
      value={{ profile, isAuthen,loading, setIsAuthen,setProfile}}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);