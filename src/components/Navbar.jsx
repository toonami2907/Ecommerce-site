import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Heart,
  Menu,
  Search,
  ShoppingBagIcon,
  User,
  UserRound,
  X,
} from "lucide-react";
import Cart from "../Pages/ProductPage/Cart";
import { useGlobalContext } from "./config/StateProvider";
import axios from "axios";
import Modal from "react-modal";
import toast from "react-hot-toast";
import Search_style from "./Search_style";
import Sign_Up from "../Auth/Sign_Up";
import Modal_component from "./Modal_component";
import { useCookies} from "react-cookie";


Modal.setAppElement("#root");

const Navigation = [
  { name: "Trending", to: "#" },
  { name: "Men", to: "#" },
  { name: "Female", to: "#" },
  { name: "Kids", to: "#" },
  { name: "Accessories", to: "#" },
];

export const Navbar = () => {
  const [searchbox, setSearchbox] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user_id']);
  const [cookieValue, setCookieValue] = useState("")
  const [modalOpen, setModalOpen] = useState({
    isShown: false,
    type: "message",
    data: null,
  });
  const { userinfo, cartupdate, handle_accessories } = useGlobalContext();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  

  useEffect(()=>{
    const value = cookies.user_id;
    setCookieValue(value)
  },[cookies])


  const Authentication = async () => {
    setModalOpen({ isShown: true, type: "message", data: null });
  };
  const clearSearch = () => {
    setSearch("");
  };
  const signOut = () => {
    localStorage.setItem("userID", "");
    navigate("/login");
    window.location.reload();
  };
  const handleInput = () => {
    setSearchbox(true);
  };
  const handle_accessorie = (name)=>{
    handle_accessories(name)
  }

  const closeSearchbox = () => {
    setSearchbox(false);
  };

  const handleSearch = async () => {
    if (!search) {
      return toast.error("Search field can't be empty");
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/product/v1/search/${search}`
      );
      setData(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        if (message.includes("Product not found.")) {
          toast.error("Product not found.");
        } else if (
          message.includes("Failed to get product, please try again later")
        ) {
          toast.error("Failed to get product, please try again later");
        } else {
          toast.error("Error: " + errorMessage);
        }
      }
    }
  };

  const handlePress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };
  return (
    <div className="h-full">
      <nav className="w-full py-4 LinkStyles flex relative items-center px-3 justify-between lg:px-10 bg-white">
        <Link
          to="/"
          className="text-2xl LinkStyles font-bold text-gray-700 lg:w-[10%]"
        >
          LOGO
        </Link>
        {/* DESKTOP NAVIGATION */}
        <ul className="lg:flex gap-5 lg:w-[30%] hidden ">
          {Navigation.map((navitem, idx) => (
            <li onClick={()=>handle_accessorie(navitem.name)} key={idx} className="text-lg LinkStyles font-semibold">
              <Link to={`/product/${navitem.name}`}>{navitem.name}</Link>
            </li>
          ))}
        </ul>
        {/* DESKTOP SEARCH FUNCTIONALITY */}
        <div className="flex items-center justify-between gap-10">
          <form className="lg:flex relative hidden">
            <input
              type="text"
              onInput={handleInput}
              onKeyPress={handlePress}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-48 pl-14 h-12 focus:border-0 outline-none placeholder:text-[18px] pr-4 bg-gray-200 rounded-full"
            />
            <button
              type="button"
              className="absolute top-0 left-0 px-3 h-12 transition-all duration-500 ease-in-out rounded-full hover:bg-gray-300"
              onClick={handleSearch}
            >
              <Search size={25} />
            </button>
          </form>
          <div className="flex gap-5 font-light">
            {/* User buttoon */}
            {cookies ? "" : <>
              <button
              onClick={() => Authentication()}
              className="hover:bg-gray-300 px-2 h-10 rounded-full"
            >
              <UserRound/>
            </button>
            
            <Modal_component
              setModalOpen={setModalOpen}
              modalOpen={modalOpen}
            />
            </> }
            
            <button
              onClick={() => setCart(!cart)}
              className="hover:bg-gray-300 relative px-2 h-10 rounded-full"
            >
              <ShoppingBagIcon />
              <span className="absolute text-xs px-2 py-1 -top-1 rounded-full text-white bg-purple-800 -right-1">
                {cartupdate === undefined ? 0 : cartupdate}
              </span>
            </button>
            {/* CART FUNCTIONALITY */}
            <div
              className={`fixed inset-0 transition-transform transform ${
                cart ? "translate-x-0" : "translate-x-full"
              } bg-opacity-50 bg-black backdrop-blur-sm z-50`}
            >
              <div className="absolute top-0 right-0 px-5 w-full md:w-1/2 bg-white h-[100vh] py-10">
                <h1 className="text-center text-2xl">Cart</h1>
                <button
                  onClick={() => setCart(!cart)}
                  type="button"
                  className="absolute top-4 right-3 px-2 h-10 rounded-full hover:bg-gray-300"
                >
                  <X size={25} />
                </button>
                <Cart setCart={setCart} />
              </div>
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden hover:bg-gray-300 px-2 h-10 rounded-full"
            >
              <Menu />
            </button>
          </div>
        </div>
        {/* MOBILE DEVICE NAVIGATION */}
        <div
          className={`lg:hidden fixed inset-0 transition-transform transform ${
            open ? "translate-x-0" : "translate-x-full"
          } bg-opacity-50 bg-black backdrop-blur-sm z-50`}
        >
          <div className="sm:w-[70%] w-full h-screen absolute px-10 top-0 right-0 bg-white">
            <button
              onClick={() => setOpen(!open)}
              type="button"
              className="absolute top-4 right-3 px-2 h-10 rounded-full hover:bg-gray-300"
            >
              <X size={25} />
            </button>
            <ul className="flex flex-col py-16 h-[400px] justify-between">
              {Navigation.map((nav, idx) => (
                <li key={idx}>
                  {/* <Link to={nav.to} className='text-3xl LinkStyles'>
                    {nav.name}
                  </Link> */}
                  <Link
                    onClick={() => setOpen(!open)}
                    to={`/product/${nav.name}`}
                    className="lg:text-3xl text-2xl LinkStyles"
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
            {userinfo && userinfo ? (
              <div className="flex flex-col items-center gap-5">
                <h1 className="text-xl font-semibold ">
                  Welcome, {userinfo.username}
                </h1>
                <button
                  onClick={signOut}
                  className="md:px-7 md:py-2 px-4 py-2 bg-red-700 hover:bg-red-500 rounded-full text-white text-lg"
                >
                  sign out
                </button>
              </div>
            ) : (
              <div className="flex gap-5 py-7">
                <button
                  onClick={() => setOpen(!open)}
                  className="md:px-7 md:py-2 px-4 py-2 bg-black hover:bg-gray-700 rounded-full text-white text-lg"
                >
                  <Link to="/register">Sign up</Link>
                </button>
                <button
                  onClick={() => setOpen(!open)}
                  className="md:px-7 md:py-2 px-4 py-2 border border-gray-600 hover:border-black rounded-full text-lg text-gray-800"
                >
                  <Link to="/Login">Sign in</Link>
                </button>
              </div>
            )}
          </div>
        </div>
        {/* SEARCH BOX FUNCTIONALITY */}
        <div
          className={`fixed inset-0  transition-transform transform ${
            searchbox ? "translate-y-0" : "translate-y-full"
          } bg-opacity-30 lg:flex hidden bg-black backdrop-blur-sm z-50`}
        >
          <div className="h-[400px] bg-gray-50 flex px-5 py-7 overflow-hidden w-full justify-between">
            <section className="flex h-0  items-center w-full py-2 justify-between">
              <h1 className="text-2xl z-50 font-bold text-black">LOGO</h1>
              <form className="relative ">
                <input
                  type="text"
                  onInput={handleInput}
                  onKeyPress={handlePress}
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-[700px] pl-14 h-12 focus:border-0 outline-none placeholder:text-[18px] pr-4 bg-gray-200 rounded-full"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="absolute top-0 left-0 px-3 h-12 rounded-full hover:bg-gray-300"
                >
                  <Search size={25} />
                </button>
                <button
                  onClick={clearSearch}
                  type="button"
                  className="absolute top-0 right-0 px-3 h-12 rounded-full hover:bg-gray-300"
                >
                  <X size={25} />
                </button>
              </form>
              <div className="flex justify-center">
                <h1 onClick={closeSearchbox} className="font-semibold">
                  Cancel
                </h1>
              </div>
            </section>
          </div>
          <div className="max-h-[300px] overflow-y-auto absolute top-20 w-full">
            <div className=" px-5 py-7 w-[90%] mx-auto">
              <Search_style data={data} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
