
"use client"
import { backendService } from '@/services/apiService'
import React, { useEffect, useState } from 'react'

const Checkbox = ({ checked, callback }: { checked: boolean, callback: () => void }) => {
  const [selected, setSelected] = useState<boolean>(checked || false)
  return <input type="checkbox" checked={selected} onChange={(e) => {
    callback()
    setSelected(prev => !prev)
  }} />
}

const Tasks = () => {
  const [tasks, setTasks] = useState([])

  const [task, setTask] = useState<{
    title?: string,
    priority?: string,
    isCompleted?: boolean,
  }>()
  const addTask = async (t: typeof task) => {
    await backendService.post('/tasks', t)
  }

  const updateTask = async (t: {
    _id: string,
    title?: string,
    priority?: string,
    isCompleted?: boolean,
  }) => {
    await backendService.patch(`/tasks/${t._id}`, t)
  }


  const deleteTask = async (t: {
    _id: string,
  }) => {
    await backendService.delete(`/tasks/${t._id}`)
  }

  const getAllTasks = async () => {
    const tasks = await backendService.get('/tasks')
    return tasks.data
  }

  useEffect(() => {
    getAllTasks().then(res =>
      setTasks(res || [])
    )
  }, [])


  return <div className='w-full max-w-2xl'>
    <form onSubmit={(e) => {
      e.preventDefault()

      console.log()
      addTask({ ...task, priority: task?.priority || "highest", isCompleted: false }).then(res =>
        getAllTasks().then(res =>
          setTasks(res || [])
        )
      )
    }}
      className='flex flex-col gap-2.5 w-full mt-20'
    >
      <div className='w-full'>

        <input className="border w-full" type="text" value={task?.title} onChange={(e) => {
          setTask({ ...task, title: e.target.value })
        }} />
      </div>
      <div className='flex gap-2'>
        <div>Priority:</div>
        <select onChange={(e) => {
          setTask({ ...task, priority: e.target.value })
        }}>
          <option value="">--Select--</option>
          <option value="highest">Highest</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="lowest">Lowest</option>
        </select>
      </div>
      <button type='submit' className='w-full bg-green-500 text-white'>Add</button>
    </form>
    <div className='mt-8 space-y-4'>
      {tasks?.map((task: any) => <div key={task._id} className='flex justify-between border px-5 py-2 rounded'>
        <div className='space-y-1.5'>
          <div className={`${task?.isCompleted ? 'line-through	italic' : ''} text-lg`}>
            {task?.title}
          </div>

          <div className='flex gap-2'>
            <div>Priority:</div>
            <select value={task?.priority} onChange={(e) => {
              if (e.target.value) {
                updateTask({
                  ...task,
                  priority: e.target.value
                }).then(res => {
                  getAllTasks().then(res =>
                    setTasks(res || [])
                  )
                })
              }
            }}>
              <option value="">--Select--</option>
              <option value="highest">Highest</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="lowest">Lowest</option>
            </select>
          </div>
          <div className='flex gap-2'>
            <div>Completed:</div>

            <div>
              <Checkbox checked={task?.isCompleted} callback={() => {
                updateTask({
                  ...task,
                  isCompleted: !task.isCompleted
                }).then(res => {
                  getAllTasks().then(res =>
                    setTasks(res || [])
                  )
                })
              }} />
            </div>
          </div>
        </div>
        <div className='text-red-500 cursor-pointer' onClick={() => {
          deleteTask({
            _id: task._id
          }).then(res => {
            getAllTasks().then(res =>
              setTasks(res || [])
            )
          })
        }}>X</div>
      </div>)}
    </div>
  </div>
}

export default Tasks