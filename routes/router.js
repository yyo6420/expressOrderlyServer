import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoByID,
  updateTodo,
} from "../controllers/todosFunctions.js";

const router = express.Router();

router.route("/").get(getAllTodos).post(createTodo);
router.route("/:id").get(getTodoByID).put(updateTodo).delete(deleteTodo);

export default router;