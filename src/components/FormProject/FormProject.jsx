import React, { useState } from "react";
import { v4 as uuid4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useProjectContext } from "../ProjectContext.jsx";

export default function FormProject({ onCloseForm }) {
  const { addProject } = useProjectContext();
  const [formData, setFormData] = useState({
    key: uuid4(),
    title: "",
    description: "",
    date: null,
    tasks: [],
  });

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const { title, description, date } = formData;

    if (!title.trim() || !description.trim() || !date) {
      alert("Please fill out all fields");
      return;
    }

    addProject(formData);
    onCloseForm();
  };

  return (
    <form className="mt-4 text-left">
      <menu className="flex items-center justify-end gap-4 my-4">
        <button
          type="button"
          onClick={onCloseForm}
          className="text-stone-800 hover:text-stone-950"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
        >
          Save
        </button>
      </menu>
      <div className="w-[50rem] mt-16">
        <label className="text-sm font-bold uppercase text-stone-500">
          Title
        </label>
        <input
          placeholder="Title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />

        <label className="text-sm font-bold uppercase text-stone-500">
          Description
        </label>
        <input
          placeholder="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />

        <label className="text-sm font-bold uppercase text-stone-500">
          Due Date
        </label>
        <div>
          <DatePicker
            className="w-[50rem] p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
            selected={formData.date}
            onChange={(date) => handleChange("date", date)}
            dateFormat="dd.MM.yyyy"
            placeholderText="dd.mm.yyyy"
          />
        </div>
      </div>
    </form>
  );
}
