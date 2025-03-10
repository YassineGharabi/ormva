import { appContext } from "@/context/ContextProvider"
import { useContext } from "react"
import { Navigate } from "react-router-dom";


const RequireAuth = ({children}) => {

    const {token} = useContext(appContext);

  return (
    token ? children : <Navigate to='/' replace  />
  )
}

export default RequireAuth