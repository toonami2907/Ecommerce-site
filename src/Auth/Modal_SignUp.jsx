import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import {Link, useNavigate}  from 'react-router-dom'
import Google from './Google'

export default function Modal_Sign_Up({setModalOpen}) {
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [username, setUsername]=useState("")
  const [invalid1, setInvalid1]=useState(false)
  const [invalid2, setInvalid2]=useState(false)
  const navigate = useNavigate()
  // const [invalid3, setInvalid3]=useState(false)


  const validatePassword = (password) => {
    // Define special characters as a string
    const specialChars = "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?";

    // Check if the password includes any special character
    return [...password].some(char => specialChars.includes(char));
  };

   const close_Modal =()=>{
    setModalOpen({
        isShown: false,
        type: "message",
        data: null,
      })
   }

  const HandleSignUp =async(e)=>{
    e.preventDefault()
    if (email===""|| password===""|| username ==="") {
      toast.error("Please complete the required fields");
      return;
    }
    if(password.length <=5){
      setInvalid2(true)
      toast.error("Password must be greater than 5 ")
    }
    else{
      setInvalid2(false)
    }
    if (!validatePassword(password)) {
      setInvalid2(true);
      toast.error("Password must contain a special character please")
      return;
    }else{
      setInvalid2(false)
    }
    if (username.length<=5) {
      toast.error("username must be greater than 5 charaters")
      setInvalid1(true)
      return;
    }else{
      setInvalid1(false)
    }
    if (email=== password) {
      toast.error("Email can't be password")
      setInvalid2(true)
      return;
    }else{
      setInvalid2(false)
    }
    try {
      await axios.post("http://localhost:8080/auth/register", {
        email, password, username
      })
      toast.success("Sign Up successfully");
      navigate("/login")
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        if (message.includes("username must be greater or must be 7")) {
          toast.error("username must be greater or must be 7");
        } else if (message.includes("User already exists with the following credentials")) {
          toast.error("User already exists");
        } else if(message.includes("password must be greater or must be 6")) {
          toast.error("Password must be greater or must be 6");
        } else if(message.includes("User already exists with the following username")) {
          toast.error("User with the Username already exist");
        } else {
          toast.error("Error: " + errorMessage);
        }
      }
    }
  }
  return (
    <div>
           <div className="min-h-full bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up to your account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={HandleSignUp}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className={`${invalid1 ? "border-red-400" : "border-green-600"} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={`${invalid2 ? "border-red-400" : "border-green-600"} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up
                </button>
              </div>
            </form>
            <Link  to="/login" className='text-black py-2'><p onClick={close_Modal} >Already have an account  Log in here  </p></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
