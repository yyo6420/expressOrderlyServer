import fs from "fs/promises";

export const getNextId = (todos) => {
  if (!todos || todos.length === 0) {
    return 1;
  }
  let maxValue = 0;
  todos.forEach((todo) => {
    if (todo.id > maxValue) {
      maxValue = todo.id;
    }
  });
  return maxValue + 1;
};

async function fileExists(filePath) {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

export const readTodos = async (path) => {
  if (!(await fileExists(path))) {
    return [];
  }
  try {
    const data = await fs.readFile(path, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};


export const writeTodos = async (todos, path) => {
  await fs.writeFile(path, JSON.stringify(todos, null, 2), "utf8");
};
