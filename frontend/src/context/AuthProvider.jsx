import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utilities/axiosInstance";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState();
  const [isAuthen, setIsAuthen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("jwt");
      const islog = localStorage.getItem("user");

      if (!token && !islog) {
        // console.log("first")
        setLoading(false);
        return 0;
      }

      try {
        // setLoading(true)
        const { data } = await axiosInstance.get(`/user/my-profile`);
        // console.log(data)
        setProfile(data.user_data);
        setIsAuthen(true);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <authContext.Provider
      value={{ profile, isAuthen, loading, setIsAuthen, setProfile }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
