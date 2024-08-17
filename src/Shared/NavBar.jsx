import image from '../assets/icon.jpg'
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { FaHome } from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext)

    const links = <>
        {
            user && <>
                <li><NavLink to='/home' className={({ isActive }) => isActive ? ' font-bold border-b-4 p-2 border-[#ff1111]' : 'font-family'}><FaHome /> Home</NavLink></li>
                <li><NavLink to='/allCard' className={({ isActive }) => isActive ? ' font-bold border-b-4 p-2 border-[#ff1111]' : 'font-family'}><MdAddIcCall />Contact</NavLink></li>
            </>
        }
    </>




    const handleLogOut = () => {
        logOut()
            .than()
            .catch()
    }

    return (
        <div className="  mx-auto  -mt-20 fixed w-full bg-gray-400 z-10 shadow-sm">
            <div className="navbar    text-black container mx-auto w-full">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <img className="w-16" src={image} alt="" />
                </div>
                <div className="navbar-end gap-2">
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {links}
                        </ul>
                    </div>
                    {
                        user ? <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL} alt="" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[10] p-4 shadow menu menu-sm text-black dropdown-content bg-base-100 rounded-box w-52 space-y-4">
                                <li className="font-bold text-center">Name: {user.displayName}</li>
                                <button onClick={handleLogOut} className="font-bold border-b-4 border-[#FF3811] p-2 rounded-xl">Log Out</button>
                            </ul>
                        </div> :
                            <Link to="/" className="btn btn-sm bg-[#ff1111] font-bold border-none">LogIn</Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default NavBar;
