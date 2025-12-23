import { getNextId, readTodos, writeTodos } from "../utils/todosFactory.js";
import path from "path";

const __dirname = path.resolve();
const TODOS_PATH = path.join(__dirname, "data", "todos.json");

export function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");

  return `${y}-${m}-${d} ${h}:${min}:${s}`;
}

// {baseUrl}/todos
// {baseUrl}/todos?completed=true
// {baseUrl}/todos?completed=false
export const getAllTodos = async (req, res) => {
  try {
    const { completed } = req.query;

    const todosArr = await readTodos(TODOS_PATH);
    let filterdArr = todosArr;
    if (completed !== undefined) {
      filterdArr = todosArr.filter(
        (todo) => String(todo.completed) === completed
      );
    }
    res.status(200).json({ msg: "success", data: filterdArr });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error" + err.message, data: null });
  }
};

// {baseUrl}/todos/1
export const getTodoByID = async (req, res) => {
  try {
    const { id } = req.params;
    const intId = parseInt(id);
    if (isNaN(intId)) throw new Error("Invalid id, please use an integer.");
    const todos = await readTodos(TODOS_PATH);
    const todo = todos.find((t) => t.id === intId);
    if (!todo) {
      res.status(404).json({ success: false, data: {} });
    } else {
      res.status(200).json({ success: true, data: todo });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

// {baseUrl}/todos/1
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const intId = parseInt(id);
    if (isNaN(intId)) throw new Error("Invalid id, please use an integer.");
    const todos = await readTodos(TODOS_PATH);
    const todo = todos.find((t) => t.id === intId);
    if (!todo) {
      res.status(404).json({ success: false, data: {} });
    } else {
      todo.title = body.title || todo.title;
      todo.description = body.description || todo.description;
      todo.completed = body.completed || todo.completed;
      todo.updated_at = new Date();
      await writeTodos(todos, TODOS_PATH);
      res.status(200).json({ success: true, data: todo });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

// {baseUrl}/todos/1
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const intId = parseInt(id);
    if (isNaN(intId)) throw new Error("Invalid id, please use an integer.");
    const todos = await readTodos(TODOS_PATH);
    const todo = todos.find((t) => t.id === intId);
    if (!todo) {
      res.status(404).json({ success: false, data: {} });
    } else {
      const indexToDelete = todos.findIndex((t) => t.id === intId);
      todos.splice(indexToDelete, 1);
      await writeTodos(todos, TODOS_PATH);
      res.status(200).json({ success: true, data: {} });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: error.message });
  }
};

// Create todo
export const createTodo = async (req, res) => {
  try {
    const todos = await readTodos(TODOS_PATH);

    const isCompleted = req.body.completed === "true";

    const newTodo = {
      id: getNextId(todos),
      title: req.body.title || "default todo",
      description: req.body.description || "",
      completed: isCompleted,
      created_at: formatDate(new Date()),
      updated_at: formatDate(new Date()),
    };
    todos.push(newTodo);
    await writeTodos(todos, TODOS_PATH);
    res.status(201).json({ msg: "success", data: req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error" + err.message, data: null });
  }
};
