import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("Not Started");

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addOrUpdateTask = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = { text: task, status };
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: task, status }]);
    }

    setTask("");
    setStatus("Not Started");
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setStatus(tasks[index].status);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter((item) => {
    const matchSearch = item.text
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchFilter = filter === "All" || item.status === filter;
    return matchSearch && matchFilter;
  });

return (
  <div className="app">
    <div className="todo-box">
      <h2>To do list</h2>

      {/* Add Row */}
      <div className="add-row">
        <input
          type="text"
          placeholder="Add task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Not Started</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <button onClick={addOrUpdateTask}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        className="search-box"
        placeholder="Search task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={filter === "Not Started" ? "active notstarted" : "notstarted"}
          onClick={() => setFilter("Not Started")}
        >
          Not Started
        </button>
        <button
          className={filter === "Pending" ? "active pending" : "pending"}
          onClick={() => setFilter("Pending")}
        >
          Pending
        </button>
        <button
          className={filter === "Completed" ? "active completed" : "completed"}
          onClick={() => setFilter("Completed")}
        >
          Complete
        </button>
      </div> {/* ✅ CLOSED filter-buttons */}

      {/* Task List */}
      <div className="task-list-container">
        <ul>
          {filteredTasks.length === 0 ? (
            <p className="no-task">
              {tasks.length === 0
                ? "No task to do 🎉"
                : "Task not found 🔍"}
            </p>
          ) : (
            filteredTasks.map((item, index) => (
              <li key={index}>
                <div className="task-left">
                  <strong>{item.text}</strong>
                  <span
                    className={`status ${item.status
                      .replace(" ", "")
                      .toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="task-actions">
                  <button onClick={() => editTask(index)}>✏️</button>
                  <button onClick={() => deleteTask(index)}>❌</button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div> 

    </div>
  </div>
);
}

export default App;
