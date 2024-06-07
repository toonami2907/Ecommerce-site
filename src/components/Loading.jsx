// components/Loading.jsx
import { Square } from 'lucide-react';
import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center gap-5 items-center h-screen bg-gray-100">
      <div className="text-xl text-gray-700 animate-spin">
        <Square  color='blue' size={40}/>
      </div>
        <h1 className='text-xl'>Please wait ....</h1>
    </div>
  );
};

export default Loading;
