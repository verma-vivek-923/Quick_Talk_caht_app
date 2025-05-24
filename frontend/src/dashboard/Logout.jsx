import React from 'react'

const Logout =async () => {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
            {
              withCredentials: true,
            }
          );
          toast.success("Logout Successfull");
        //   console.log(data);
        //   setProfile("");
          navigateTo("/login");
          localStorage.removeItem("user");
          return data
        } catch (error) {
          console.log(error);
        }
      };
 
export default Logout
