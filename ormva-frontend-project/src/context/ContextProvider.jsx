import customAxios from '@/api/customAxios';
import React, { createContext, useEffect, useState } from 'react'

export const appContext = createContext();
const ContextProvider = ({children}) => {

    const [token,setToken] = useState(localStorage.getItem('token'));
    const [user,setUser] = useState({});

    // function to get the current user if you have token
    const getUser = async () => {

        const response = await customAxios.get('user',{
            headers:{
                Authorization : `Bearer ${token}`,
            }
        });

        
        setUser(response.data);

    }

    useEffect(()=>{
        if(token){
            getUser();
        }
    },[token]);

  return (
    <appContext.Provider value={{setToken,token,user}} >
        {children}
    </appContext.Provider>
  )
}

export default ContextProvider