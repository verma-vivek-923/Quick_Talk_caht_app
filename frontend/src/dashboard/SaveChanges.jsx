import axios from "axios";
import React from "react";

const SaveChanges = async (userData,userId) => {

    console.log(userData,userId)

  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/user/updateuser/${userId}`,
      userData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
   return data
  } catch (error) {
    console.log(error)
  }

};

export default SaveChanges;
