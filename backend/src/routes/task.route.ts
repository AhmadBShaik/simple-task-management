import express from 'express';

import { createTask, deleteTaskById, getAllTasks, getTaskById, updateTaskById } from "../controllers/product.controller";

const router = express.Router()
router.post("/",
  createTask
);

router.get("/", getAllTasks
);

router.get("/:id", getTaskById);

router.patch("/:id", updateTaskById);

router.delete("/:id", deleteTaskById);
export { router as taskRoute };
