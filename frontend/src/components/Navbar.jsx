import React, { useEffect, useState } from "react";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { IoMenuSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { profile, isAuthen, setProfile } = useAuth();

  const [isOpen,setIsOpen]=useState(false)

  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success("Logout Successfull");
      console.log(data);
      setProfile("");
      navigateTo("/login");
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(profile);

  useEffect(() => {
    const checkbox = document.getElementById("my-drawer");
    if (checkbox) {
      setIsOpen(checkbox.checked)
      const handler = () => setIsOpen(checkbox.checked);
      checkbox.addEventListener("change", handler);
      return () => checkbox.removeEventListener("change", handler);
    }
   
  }, []);

  const toggleDrawer = () => {
    const checkbox = document.getElementById("my-drawer");
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      setIsOpen(checkbox.checked);
    }
  };

  return (
    <div className="w-[50px] z-[50] md:flex overflow-hidden min-h-screen bg-slate-900">
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center mt-8 gap-4">
          <label
            onClick={toggleDrawer}
            // htmlFor="my-drawer"
            className={`${isOpen ? "bg-green-800/40" : ""} p-2 hover:bg-white/20  rounded-md transition-all duration-200`}
          >
            <IoMenuSharp size={26} />
          </label>
          <div className="p-2 hover:bg-white/20 bg-green-800/40 rounded-md transition-all duration-200">
            <MdOutlineMarkUnreadChatAlt size={26} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mb-8 gap-4">
          <div
            onClick={handleLogout}
            className="p-2 hover:bg-white/20 rounded-md transition-all duration-200 text-red-400 hover:tracking-wider"
          >
            <BiLogOut size={26} />
          </div>

          <Link className="avatar">
            <div className="ring-primary ring-offset-base-100 w-9 rounded-full ring-2 ring-offset-2">
              <img src={profile?.image?.url} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
