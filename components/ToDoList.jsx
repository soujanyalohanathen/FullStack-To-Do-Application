import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const ToDoList = () => {
    const [tasks, setTask] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getTasks = async () => {
        setIsLoading(true)
        const res = await (await fetch('../api/tasks/get-tasks')).json();
        if (res.success) {
            setIsLoading(false)
            setTask(res.tasks)

        }
    }
    
    const deleteTask = async (id) => {
        const res = await (await fetch(`../api/tasks/${id}`, {
            method: 'DELETE'
        })).json();
        if (res.success) {
            toast(res.message, {
                type: 'success'
            });
            getTasks();
        } else {
            toast(res.message, {
                type: 'error'
            });
        }
    }
    useEffect(() => {
        getTasks()

    }, [])
    return (
        <div>
            <div className="container mx-auto my-4 mb-8">
                <h1 className="text-center font-bold text-3xl text-teal-700 my-6">
                    Your tasks ( {tasks.length > 0 ? tasks.length : 0} )
                </h1>
                {tasks.length == 0 && <div className="text-center font-semibold my-3 text-xl">No Tasks yet</div>}
                {isLoading && <div className="my-4 text-center text-2xl">Loading.....</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:grid-cols-3">
                    {!isLoading && tasks && tasks.map((val) => {
                        return (
                            <div key={val._id}>
                                <div className={`shadow p-4 md:mx-0 mx-4 
                                ${val.color === 1 ? 'bg-black text-white' :
                                        val.color === 2 ? 'bg-teal-400 text-white' :
                                            val.color === 3 ? 'bg-yellow-300 text-white' :
                                                val.color === 4 ? 'bg-pink-400 text-white' :
                                                    val.color === 5 ? 'bg-violet-400 text-white' :
                                                        val.color === 6 ? 'bg-cyan-400 text-white' :
                                                            val.color === 7 ? 'bg-red-400 text-white' : 'bg-white text-black'}  rounded-md mt-2 `}>
                                    <h2 className="text-xl font-bold">{val.task}</h2>
                                    <p className="text-md my-2">
                                        {val.notes}
                                    </p>
                                    <label><input type="checkbox" className="bg-red-700 rounded py-2 px-6 text-white text-sm ml-3"/>In Progrss</label>
                                    <label><input type="checkbox" className="bg-red-700 rounded py-2 px-6 text-white  text-sm ml-3" onChange={() => { deleteTask(val._id) }}/>Delete</label>
                                </div>
                            </div>

                        )
                    })}

                </div>

                <div className="flex justify-between my-5">
                    <button className="bg-teal-700 rounded py-3 px-6 text-white text-sm mt-100 ml-3">Prev</button>
                    <button className="bg-teal-700 rounded py-3 px-6 text-white text-sm mt-100 mr-3 ml-3">Next</button>
                </div>
            </div >
        </div >
    )
}

export default ToDoList