import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../pages/contextapi/GlobalContext'

const Navbar = () => {
    const { isLoggedIn, getUsers, users, logoutUser } = useContext(GlobalContext);

    const logout = () => {
        logoutUser();
        localStorage.removeItem('access_token')
    }
    useEffect(() => {
        getUsers();
    }, [])

    const router = useRouter()
    return (
        <div className="bg-teal-400">
            <div className="container mx-auto py-4">
                <div className="flex justify-between items-center">
                    <div className="">
                        {!isLoggedIn && ''}
                        {isLoggedIn && <>
                            <Link href={'/'}>
                                <a className={` ${router.pathname === '/' ? ' border-b text-teal-800 ' : ''}  text-white text-xl`}>Dashboard</a>
                            </Link>
                            <Link href={'/create'}>
                                <a className={` ${router.pathname === '/create' ? ' border-b text-teal-800' : ''}  ml-4 text-white text-xl`}>Add New Task</a>
                            </Link></>}
                    </div>
                    <div className="">
                        {!isLoggedIn && <>
                            <Link href={'/signin'}>
                                <a className={` ${router.pathname === '/signin' ? ' border-b text-teal-800' : ''}  text-white text-xl`}>Signin</a>
                            </Link>
                            <Link href={'/signup'}>
                                <a className={` ${router.pathname === '/signup' ? ' border-b text-teal-800' : ''}  ml-4 mr-3 text-white text-xl`}>Signup</a>
                            </Link></>}
                        {isLoggedIn && <div className="flex items-center">
                            <h3 className="text-xl text-white">{users.name}</h3>
                            <button className="ml-3 text-xl text-white border px-4 py-1 rounded-md" onClick={logout}>Logout</button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar