import React from "react";
import axiosInstance from "../utilities/axiosInstance";

const Logout = async () => {
  try {
    const { data } = await axiosInstance.get(`/user/logout`);
    toast.success("Logout Successfull");
    //   console.log(data);
    //   setProfile("");
    navigateTo("/login");
    localStorage.removeItem("user");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default Logout;
