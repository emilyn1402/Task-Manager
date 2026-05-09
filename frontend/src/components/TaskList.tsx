import { useState } from "react";

// Component for displaying tasks and handling deletion and selection
// Define Task type
interface Task {
  id: number;
  title: string;
}

interface TaskListProps {
  tasks: Task[]; // Array of tasks to display
  onDelete: (id: number) => void; // Function to delete a task
  onSelectItem: (item: string, index: number) => void; // Function to handle item selection
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onSelectItem,
}) => {
  const [isCrossed, setIsCrossed] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(-1);

  // Handle toggling the line-through style
  const handleTaskClick = (id: number) => {
    setSelectedTaskId(id);
    setIsCrossed(!isCrossed);
    onSelectItem(`Task with ID ${id} clicked`, id);
  };

  return (
    <>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={task.id}
            onClick={() => handleTaskClick(task.id)}
          >
            <p
              style={{
                textDecoration:
                  isCrossed && selectedTaskId === task.id
                    ? "line-through"
                    : "none",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              {task.title}
            </p>
            <button
              className="btn btn-danger btn-sm"
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
