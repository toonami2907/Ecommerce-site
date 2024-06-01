import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "./src/components/config/StateProvider";


export const PotectedRoute = () => {
  const{ token} = useGlobalContext();
return token ?<>
<Outlet/>
</> 
:<>
 <Navigate to="/Login"/>
 </> 
}
