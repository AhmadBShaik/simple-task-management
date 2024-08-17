import mongoose from 'mongoose'


const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the task"]
  },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    required: [true, "Please enter the priority"]
  },
  isCompleted: {
    type: Boolean,
  }
}, {
  timestamps: true
})

export const Task = mongoose.model("Task", TaskSchema)
