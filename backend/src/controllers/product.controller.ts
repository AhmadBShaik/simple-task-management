import { Request, Response } from 'express'
import { Task } from '../models/task.model'

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create({ ...req.body, isCompleted: false })
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ message: `Task with id: ${id} not found` })

    }
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}


export const updateTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const task = await Task.findByIdAndUpdate(id, req.body)
    if (!task) {
      return res.status(404).json({ message: `Task with id: ${id} not found` })

    }
    const updatedTask = await Task.findById(id)
    res.status(200).json(updatedTask)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const deleteTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const task = await Task.findByIdAndDelete(id, req.body)
    if (!task) {
      return res.status(404).json({ message: `Task with id: ${id} not found` })

    }
    res.status(200).json({ message: `Task with id: ${id} deleted sucessfully!` })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}