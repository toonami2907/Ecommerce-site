import React from 'react'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../Firebase/firebase';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Google() {
  const navigate = useNavigate()
  const HandleGoogleAuth = async(e)=>{
    e.preventDefault();
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken(); // Get Firebase ID token

    const res = await fetch("https://ecommerce-backend-kl4l.onrender.com/auth/google", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Send the ID token to the server
      },
      body: JSON.stringify({
        username: result.user.displayName,
        email: result.user.email,
      }),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    toast.success('Login successful');
    navigate("/")
    

    // Store token, username, and email in localStorage
    localStorage.setItem("userID", response.data.user_id);

    console.log('Token:', data.user_id);
    console.log('Username:', data.username);
    console.log('Email:', data.email);
  } catch (error) {
    console.error("Error during Google authentication:", error);
    toast.error('Login failed');
  }
  }
  return (

    <div>
      <button
      onClick={HandleGoogleAuth}
       className='w-full mt-2 rounded-md py-2 text-white bg-red-700'>Continue with google</button>
    </div>
  )
}
