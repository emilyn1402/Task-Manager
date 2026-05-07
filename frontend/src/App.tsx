import { useEffect, useState } from "react";
import axios from "axios";

interface TaskProps {
  id: number;
  title: string;
}

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from the backend API
  useEffect(() => {
    axios
      .get<TaskProps[]>("http://localhost:5017/api/tasks")
      .then((res) => setTasks(res.data));
  }, []);

  // Handle adding a new task
  const addTask = () => {
    axios
      .post<TaskProps>("http://localhost:5017/api/tasks", { title: newTask })
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask("");
      });
  };

  // Handle deleting a task
  const deleteTask = (id: number) => {
    axios.delete(`http://localhost:5017/api/tasks/${id}`).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>Task List</h1>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <button onClick={addTask}>Add Task</button>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title}
              <button
                onClick={() => deleteTask(task.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
