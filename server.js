import express from "express";
import path from "path";

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


// example headers
app.get("/headers-example", (req, res) => {
  const headers = req.headers;
  console.log(headers);
  if (headers["x-user-role"] === "simple-user") {
    return res.status(401).json({
      success: false,
      msg: "Simple User is Unauthorized",
    });
  } else if (headers["x-user-role"] === "admin") {
    return res.status(200).json({
      success: true,
      msg: "Admin is Authorized",
    });
  } else {
    return res.status(401).json({
      success: false,
      msg: "Unauthorized to access this resource",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
