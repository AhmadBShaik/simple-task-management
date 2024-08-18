import dotenv from 'dotenv';
import express, { Express } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { taskRoute } from './routes/task.route';
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/tasks", taskRoute)

mongoose.connect("mongodb://root:password@mongo-db:27017/").then(() => {
  console.log("database connection successful!")
}).catch((error) => {
  console.log(`database connection failed!, Error:${error}`)
})

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
