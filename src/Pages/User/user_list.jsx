import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

export default function User_list() {
    const [user, setUser] = useState([]);
    const BASE_URL = "http://localhost:8080"

const fetch_users = async() =>{
    try {
        const response =await axios.get(`${BASE_URL}/auth/all_user`, { withCredentials: true } )
        setUser(response.data.response);
    } catch (error) {
        console.log(error);
    }
}

const delete_user = async (id)=>{
    try {
        const response =  await axios.delete(`${BASE_URL}/auth/delete/${id}`)
        toast.success("deleted suceesssfully")
        window.location.reload( )
    } catch (error) {
        console.log(error);
    }
}


useEffect(()=>{
    fetch_users()
}, [])

  return (
    <div className='max-h-full h-[700px] max-w-full overflow-x-auto'>
      <h1 className='text-2xl font-semibold text-center py-2'>Users Available: {user.length} </h1>
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cart
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {user.map((person, personIdx) => (
                  <tr key={person._id} >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{person.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.cart.length}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">customer</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                      onClick={()=>delete_user(person._id)}
                      className="text-red-600 hover:text-indigo-900">
                        Delete 
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
