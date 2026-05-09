import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import { useEffect, useState } from "react";
import axios from "axios";

// Define Task type
interface TaskProps {
  id: number;
  title: string;
  completed: boolean;
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
      .post<TaskProps>("http://localhost:5017/api/tasks", {
        title,
        completed: false,
      })
      .then((res) => setTasks([...tasks, res.data])); // Append new task to list
  };

  // Function to delete a task
  const deleteTask = (id: number) => {
    axios
      .delete(`http://localhost:5017/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter((t) => t.id !== id))); // Remove task from list
  };

  // Function to handle update of task completion status
  const toggleTaskCompletion = (id: number) => {
    // Find the task to update
    const taskToUpdate = tasks.find((t) => t.id === id);
    // If task is found, toggle its completion status
    if (taskToUpdate) {
      // Store the original task state for potential rollback
      const originalTask = { ...taskToUpdate };
      // Log the original task state before updating
      console.log("Toggling task:", originalTask);

      // Optimistically update the UI first
      const updatedTask = {
        ...taskToUpdate,
        completed: !taskToUpdate.completed,
      };
      // Log the updated task state before sending the request
      console.log("Updated task:", updatedTask);

      // Update the task in the local state immediately
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));

      // Send the update request to the backend
      axios
        .put(`http://localhost:5017/api/tasks/${id}`, updatedTask)
        .then(() => {
          console.log("Task completion updated successfully on server");
        })
        .catch((error) => {
          console.error("Failed to update task completion:", error);
          setTasks(tasks.map((t) => (t.id === id ? originalTask : t)));
          alert(
            "Failed to update task. Please check if the backend is running.",
          );
        });
    } else {
      console.error("Task not found with id:", id);
    }
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
            onToggleCompletion={toggleTaskCompletion}
          />
        </div>
      </div>
    </>
  );
}

export default App;
