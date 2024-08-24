import dotenv from 'dotenv';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import { taskRoute } from './routes/task.route';
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/tasks", taskRoute)

mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_NAME}:27017/`).then(() => {
  console.log("database connection successful!")
}).catch((error) => {
  console.log(`database connection failed!, Error:${error}`)
})

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
