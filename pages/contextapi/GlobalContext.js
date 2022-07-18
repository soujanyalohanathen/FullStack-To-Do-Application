import { createContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'

export const GlobalContext = createContext({})
const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [users, setUser] = useState({})
    const router = useRouter()


    const getUsers = async () => {

        const res = await (await fetch('../api/auth/user', {
            method: 'GET',
        })).json()
        if (res.success) {
            setUser(res.users)
            setIsLoggedIn(true)
        }
    }

    const logoutUser = async () => {
        setUser({})
        setIsLoggedIn(false)
        const res = await (await fetch('../api/auth/logout')).json()
        router.push('/signin')
    }
  
    useEffect(() => {
        getUsers();
    }, [])

    return <GlobalContext.Provider value={{ isLoggedIn, getUsers, users, logoutUser }}>
        {children}
    </GlobalContext.Provider>
}


export default GlobalProvider