import React from "react";

// Component for displaying tasks and handling deletion and selection
// Define Task type
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[]; // Array of tasks to display
  onDelete: (id: number) => void; // Function to delete a task
  onSelectItem: (item: string, index: number) => void; // Function to handle item selection
  onToggleCompletion: (id: number) => void; // Function to toggle task completion status
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onSelectItem,
  onToggleCompletion,
}) => {
  // Handle toggling the line-through style and completion status
  const handleTaskClick = (id: number) => {
    onToggleCompletion(id);
    onSelectItem(`Task with ID ${id} clicked`, id);
  };

  return (
    <>
      <ul className="list-group mb-3 ">
        {tasks.length === 0 && (
          <>
            <li className="list-group-item d-flex align-items-center bg-transparent text-light">
              <p>No task found!</p>
            </li>
          </>
        )}

        {tasks.map((task) => (
          <li
            className="list-group-item d-flex align-items-center bg-transparent text-light"
            key={task.id}
          >
            <input
              className="form-check-input me-1"
              type="checkbox"
              value=""
              id={`checkbox-${task.id}`}
              checked={task.completed}
              onChange={() => handleTaskClick(task.id)}
            />
            <label
              className="form-check-label"
              htmlFor={`checkbox-${task.id}`}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
                userSelect: "none",
                flex: 1,
              }}
            >
              {task.title}
            </label>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(task.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
