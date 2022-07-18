import React, { useEffect } from 'react'
import CreateTask from '../components/CreateTask'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'

const Create_Task = () => {
    const router = useRouter()
    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            router.push('/signin')
        }
    }, [])
    return (
        <div>
            <Navbar />
            <CreateTask />
        </div>
    )
}

export default Create_Task