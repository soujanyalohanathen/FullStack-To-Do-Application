import React, { useContext, useState } from 'react'
import { GlobalContext } from '../pages/contextapi/GlobalContext'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

const CreateTask = () => {
  const router = useRouter()
  const { users } = useContext(GlobalContext)
  const [tasks, setTask] = useState({
    task: '',
    notes: '',
    user_id: '',
    color: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTask({ ...tasks, [name]: value });
  }

  const CreateTasks = async (e) => {
    e.preventDefault();
    const { task, notes, user_id, color } = tasks;
    const data = {
      task, notes, user_id: users._id, color
    }
    setIsLoading(true)
    const res = await (await fetch('../api/tasks/create', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'Application/json'
      }
    })).json();
    if (res.success) {
      setIsLoading(false)
      toast(res.message, {
        type: 'success'
      });
      setTask({
        task: '',
        notes: '',
        user_id: '',
        color: ''
      })
      router.push('/')
    }
    else {
      setIsLoading(false)
      toast(res.message, {
        type: 'error'
      });
    }
  }
  return (
    <div className="container mx-auto max-w-xl">
      <div className="shadow my-5 p-4">
        <h2 className="text-2xl text-center">Add New Task</h2>
        <form action="" className="my-2" onSubmit={CreateTasks}>
          <div className="my-2">
            <label htmlFor="" className="font-semibold text-xl">Task</label>
            <input type="text" name="task" value={tasks.task} onChange={onChangeHandler} className="rounded py-2 px-2 outline-teal-500 border w-full my-2"/>
          </div>
          <div className="my-2">
            <label htmlFor="" className="font-semibold text-xl">Other Notes</label>
            <textarea type="text" col="4" row="4" name="notes" value={tasks.notes} onChange={onChangeHandler} className="rounded py-2 px-2 outline-teal-500 border w-full my-2"></textarea>
          </div>
          <div className="my-2">
            <label htmlFor="" className="font-semibold text-xl">Widget color</label>
            <select name="color" onChange={onChangeHandler} select={tasks.color} className="rounded py-2 px-2 outline-teal-500 border w-full my-2">
              <option disabled select>White</option>
              <option value="1" className="text-black">Black </option>
              <option value="2" className="text-teal-400">Teal Green </option>
              <option value="3" className="text-yellow-300">Yellow </option>
              <option value="4" className="text-pink-400">Pink </option>
              <option value="5" className="text-violet-400">Lavender</option>
              <option value="6" className="text-cyan-400">Cyan Blue</option>
              <option value="7" className="text-red-400">Red</option>
            </select>
          </div>
          <button className="bg-teal-400 rounded py-2 px-6 text-white " type="submit">{isLoading ? 'Saving...' : 'Save'}</button>
        </form>
      </div>
    </div>
  )
}

export default CreateTask