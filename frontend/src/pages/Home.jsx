import React from "react";
import Navbar from "../components/Navbar";
import Left from "../Left";
import Right from "../Right";

const Home = () => {

  
  return (
    <>
      <div className=" hidden md:flex min-h-screen w-full ">
        <Navbar />
        <Left drawerClass="w-[20%]" />
        <Right drawerClass="" />
      </div>

      <div className="drawer md:hidden md:drawer-open min-h-screen w-full flex">
        <input id="my-drawer"  type="checkbox" defaultChecked className="drawer-toggle hidden" />
        <Navbar />

        <div className="drawer-side lg:hidden w-full  ">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <Left drawerClass="w-[80%] pl-12" />
        </div>
        <div className="lg:w-[20%] hidden  ">
          <Left drawerClass="" />
        </div>
        <Right drawerClass="drawer-content " />
      </div>
    </>
  );
};

export default Home;
