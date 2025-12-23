import { getNextId, readTodos, writeTodos } from "../utils/todosFactory.js";
import path from "path";

const PORT = process.env.PORT || 8000;
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
