import { useState } from "react";

// Component for inputting new tasks and adding them to the list via a callback function
interface TaskInputProps {
  onAddTask: (task: string) => void;
}

function TaskInput({ onAddTask }: TaskInputProps) {
  // State to hold the current value of the input field
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      //Prevent adding empty tasks
      onAddTask(newTask); // Call the parent function to add the task
      setNewTask(""); // Clear the input field after adding the task
    }
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task"
      />
      <button className="btn btn-primary" onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
}

export default TaskInput;
