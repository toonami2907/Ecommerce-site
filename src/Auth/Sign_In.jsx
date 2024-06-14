import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Sign_In() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid1, setInvalid1] = useState(false);
  const [invalid2, setInvalid2] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  // const [cookie2, setCookie2, removeCookie2] = useCookies(['user_id']);
  const navigate = useNavigate();

  const HandleSignIn = async (e) => {
    e.preventDefault();
    if (email === "") {
      setInvalid1(true);
      toast.error("Email can't be empty");
      return;
    } else {
      setInvalid1(false);
    }
    if (password === "") {
      setInvalid2(true);
      toast.error("Password can't be empty");
      return;
    } else {
      setInvalid2(false);
    }
    try {
      const response = await axios.post("https://ecommerce-backend-kl4l.onrender.com/auth/login", {
        email,
        password,
      });
    
      if (response.status === 200) {
        const { token, user_id } = response.data;
        
        toast.success("Signed in successfully");
        setCookie('access_token', token, { path: '/', maxAge: 900000 });
        // setCookie2('user_id', user_id, { path: '/', maxAge: 900000 });
        // console.log(cookies);
        // console.log(cookie2);
        localStorage.setItem("userID", user_id);
        localStorage.setItem("token", token);
        navigate("/");
        window.location.reload();
      } else {
        toast.error(response.data.message || "Sign in failed");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
      console.log(error);
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={HandleSignIn}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
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
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
}
