import React, { useState, useEffect } from "react";

import AddTask from "./components/AddTask";
function App() {
  const [task, setTask] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(task));
  }, [task]);
  const addNewTasks = () => {
    if (newTask === "") {
      alert("Please add Task first");
    } else if (editId) {
      const updateTask = task.map((todo) => {
        return todo.id === editId ? { ...todo, todo: newTask } : todo;
      });
      setTask(updateTask);
      setEditId(null);
    } else {
      const id = task.length ? task[task.length - 1].id + 1 : 1;
      const myTask = { id: id, todo: newTask };
      setTask([...task, myTask]);
      setNewTask("");
    }
  };
  const handleDelete = (id) => {
    const filterTask = task.filter((todo) => {
      return todo.id !== id;
    });
    setTask(filterTask);
  };
  const handleEdit = (id) => {
    const findTask = task.find((todos) => {
      return todos.id === id;
    });
    setNewTask(findTask.todo);
    setEditId(id);
  };
  return (
    <>
      <AddTask
        addNewTasks={addNewTasks}
        newTask={newTask}
        setNewTask={setNewTask}
        handleDelete={handleDelete}
        task={task}
        handleEdit={handleEdit}
      />
    </>
  );
}

export default App;
