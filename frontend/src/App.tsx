import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import { useEffect, useState } from "react";
import axios from "axios";

// Define Task type
interface TaskProps {
  id: number;
  title: string;
}

function App() {
  // State to hold all tasks
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  // Fetch tasks from backend API when component loads
  useEffect(() => {
    axios
      .get<TaskProps[]>("http://localhost:5017/api/tasks")
      .then((res) => setTasks(res.data));
  }, []);

  // Function to add a new task
  const addTask = (title: string) => {
    axios
      .post<TaskProps>("http://localhost:5017/api/tasks", { title })
      .then((res) => setTasks([...tasks, res.data])); // Append new task to list
  };

  // Function to delete a task
  const deleteTask = (id: number) => {
    axios
      .delete(`http://localhost:5017/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter((t) => t.id !== id))); // Remove task from list
  };
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ marginTop: "50px" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h1>Task List</h1>
          <TaskInput onAddTask={addTask} />
          <TaskList
            onSelectItem={(item, index) =>
              console.log(`Selected item: ${item} at index ${index}`)
            }
            tasks={tasks}
            onDelete={deleteTask}
          />
        </div>
      </div>
    </>
  );
}

export default App;
