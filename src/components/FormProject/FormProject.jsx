import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function FormProject({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
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

    const formattedDate = date ? format(date, "dd.MM.yyyy") : null;

    console.log({
      title,
      description,
      date: formattedDate,
    });

    onSave(formData);

    onClose();
  };

  return (
    <form className="mt-4 text-left">
      <menu className="flex items-center justify-end gap-4 my-4">
        <button
          type="button"
          onClick={onClose}
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
