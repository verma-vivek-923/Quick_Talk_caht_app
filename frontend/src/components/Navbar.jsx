import React, { useEffect, useState } from "react";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { IoMenuSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Dashboard from "../dashboard/Dashboard";
import selection from "../context/selection";
import { LoadingCircle } from "./Loading";

const Navbar = () => {
  const { profile, isAuthen, setProfile } = useAuth();
  const { selectOption, setSelectOption } = selection();
  const [loading,setLoading]=useState(false)

  const [isOpen, setIsOpen] = useState(false);

  const navigateTo = useNavigate();

  const handleLogout = async () => {
    setLoading(true)
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
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  // console.log(profile);

  useEffect(() => {
    const checkbox = document.getElementById("my-drawer");
    // console.log(checkbox.checked)
    if (checkbox) {
      setIsOpen(checkbox.checked);
      const handler = () => setIsOpen(checkbox.checked);
      checkbox.addEventListener("change", handler);
      return () => checkbox.removeEventListener("change", handler);
    }
  }, []);

  const toggleDrawer = (opVal) => {
    setSelectOption(opVal);
    const checkbox = document.getElementById("my-drawer");
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      setIsOpen(checkbox.checked);
    }
  };

  const openDrawer = (opVal) => {
    setSelectOption(opVal);
    const checkbox = document.getElementById("my-drawer");
    if (checkbox) {
      checkbox.checked = true;
      setIsOpen(checkbox.checked);
    }
  };

  return (
    <div className="w-[45px] z-[50] md:flex  overflow-hidden min-h-screen bg-slate-900">
      <div className="h-full w-full flex flex-col items-center justify-between">
        <div className="flex flex-col items-center justify-center mt-8 gap-4">
          <label
            onClick={()=>toggleDrawer("chat")}
            // htmlFor="my-drawer"
            className={`${
              isOpen ? "bg-green-800/40" : ""
            } p-2 hover:bg-white/20  rounded-md transition-all duration-200`}
          >
            <IoMenuSharp size={22} />
          </label>
          <div
            onClick={()=>openDrawer("chat")}
            className={`${selectOption==="chat" ? "bg-green-900/50" :""} p-2 hover:bg-white/20  rounded-md transition-all duration-200`}
          >
            <MdOutlineMarkUnreadChatAlt size={22} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mb-8 gap-4">
          <div
            onClick={handleLogout}
            className="p-2 hover:bg-white/20 rounded-md transition-all duration-200 text-red-400 hover:tracking-wider"
          >
            {!loading ? (
             <BiLogOut size={22} />
            ) : (
              <div className="flex justify-center items-center space-x-2">
               <LoadingCircle/>
                {/* <span>Loging In...</span> */}
              </div>
            )}
          </div>

          <Link onClick={() => openDrawer("dash")} className="avatar">
            <div className={`${selectOption === "dash" ? "ring-accent" : "ring-primary"}  ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-1`}>
              <img src={profile?.image?.url} />
            </div>
          </Link>
        </div>
      </div>
      {/* <Dashboard/> */}
    </div>
  );
};

export default Navbar;
