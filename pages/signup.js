import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

const signup = () => {

    const router = useRouter()
    const [users, setUsers] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false)

    const onChangeHandler = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setUsers({ ...users, [name]: value });
    }

    const signup = async (e) => {
        e.preventDefault();

        const { name, email, password } = users;

        const data = {
            name, email, password
        }
        setIsLoading(true)
        const res = await (await fetch('./api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
        if (res.success) {
            setIsLoading(false)
            toast(res.message, {
                type: 'success'
            });
            setUsers({
                name: '',
                email: '',
                password: ''
            });
            router.push('/signin')
        } else {
            setIsLoading(false)
            toast(res.message, {
                type: 'error'
            });
        }
    }

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            router.push('/')
        }
    }, [])
    return (
        <div >
            <Navbar />
            <div className="container mx-auto max-w-xl">
                <div className="shadow my-5 p-4">
                    <h2 className="text-2xl text-center">Signup Form</h2>
                    <form action="" onSubmit={signup} className="my-2">
                        <div className="my-2">
                            <label htmlFor="" className="font-semibold text-xl">Enter Your Name</label>
                            <input type="text" name="name" value={users.name} onChange={onChangeHandler} id="" className="rounded py-2 px-2 outline-teal-400 border w-full my-2" />
                        </div>
                        <div className="my-2">
                            <label htmlFor="" className="font-semibold text-xl">Enter Your Email</label>
                            <input type="email" name="email" value={users.email} onChange={onChangeHandler} id="" className="rounded py-2 px-2 outline-teal-400 border w-full my-2"  />
                        </div>
                        <div className="my-2">
                            <label htmlFor="" className="font-semibold text-xl">Enter Your Password</label>
                            <input type="password" name="password" value={users.password} onChange={onChangeHandler} id="" className="rounded py-2 px-2 outline-teal-400 border w-full my-2"/>
                        </div>
                        <button className="bg-teal-400 rounded py-2 px-6 text-white" type="submit">{isLoading ? 'Registering...' : 'Signup'}</button>
                    </form>
                </div>
            </div >
        </div>
    )
}

export default signup