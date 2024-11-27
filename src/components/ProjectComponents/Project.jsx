import { format } from "date-fns";
import { useState } from "react";
import { useProjectContext } from "../ProjectContext";

export default function Project() {
  const { selectedProject, updateProject, deleteProject } = useProjectContext();
  const [newTask, setNewTask] = useState("");

  if (!selectedProject) {
    return <p>Project not found</p>;
  }

  const handleAddTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...(selectedProject.tasks || []), newTask.trim()];
      updateProject({ ...selectedProject, tasks: updatedTasks });
      setNewTask("");
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = selectedProject.tasks.filter((_, i) => i !== index);
    updateProject({ ...selectedProject, tasks: updatedTasks });
  };

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const tasks = (task, index) => {
    return (
      <ul
        key={index}
        className="flex justify-between p-4 mt-8 rounded-md bg-stone-100"
      >
        <li className="flex justify-between my-4">{task}</li>
        <button
          onClick={() => handleRemoveTask(index)}
          className="text-stone-700 hover:text-red-500"
        >
          Clear
        </button>
      </ul>
    );
  };

  const formattedDate = selectedProject.date
    ? format(new Date(selectedProject.date), "MMM d, yyyy")
    : "No date provided";

  return (
    <div className="w-[35rem] mt-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-stone-600 mb-2">
          {selectedProject.title}
        </h1>
        <button
          onClick={() => deleteProject(selectedProject)}
          className="text-stone-700 hover:text-red-500"
        >
          Delete
        </button>
      </div>
      <p className="text-stone-400 mb-4">{formattedDate}</p>
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        {selectedProject.description}
      </header>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <div className="flex items-center gap-4">
        <input
          value={newTask}
          onChange={handleChange}
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
          placeholder="Add a new task"
        />
        <button
          onClick={handleAddTask}
          className="text-stone-700 hover:text-stone-950"
        >
          Add Task
        </button>
      </div>
      {selectedProject.tasks &&
        selectedProject.tasks.map((value, index) => tasks(value, index))}
    </div>
  );
}
