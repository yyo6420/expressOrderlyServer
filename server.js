import express from "express";
import path from "path";
import todos from "./routes/router.js";
import getExampleHeaders from "./routes/routerExapmpleHeaders.js";

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 8000;
const TODOS_PATH = path.join(__dirname, "data", "todos.json");
// another option: const TODOS_PATH = process.env.TODOS_PATH || __dirname + "/data/todos.json";

// Body parser
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ================== ROUTES ===================

app.get("/", async (req, res) => {
  res.json({
    message: "Welcome to Todo List API",
    version: "1.0.0",
  });
});


app.get("/todos", todos);
app.get("/headers-example", getExampleHeaders)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});