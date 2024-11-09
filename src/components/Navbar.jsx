import React from "react";
import { IoMoon } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="flex justify-between  drop-shadow-md bg-white py-4 px-10">
      <a href="/">
        <h1 className="font-bold text-lg">Where in the world?</h1>
      </a>
      <div className="toggle" >
        <div className="toggle-dark flex items-center cursor-pointer" onClick={()=> {document.body.classList.toggle('dark')
         
          
        }}>
          <IoMoon className="mr-2"/>
          <p>Dark Mode</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
