import React, { useState } from "react";
import { v4 as uuid4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useProjectContext } from "../ProjectContext.jsx";
import { TextField, FormHelperText } from "@mui/material";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FormProject({ onCloseForm }) {
  const { addProject } = useProjectContext();
  //const [email, setEmail] = useState();
  const [formData, setFormData] = useState({
    key: uuid4(),
    title: "",
    description: "",
    date: null,
    email: "",
    tasks: [],
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    date: "",
    email: "",
  });

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      title: "",
      description: "",
      date: "",
      email: "",
    };

    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!formData.date) {
      newErrors.date = "Due date is required";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      const { key, title, description, date, tasks, email } = formData;
      addProject(formData);
      onCloseForm();
    }
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
        <TextField
          label="Title"
          fullWidth
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
          sx={{ marginBottom: "10px", marginTop: "10px" }}
        />

        <label className="text-sm font-bold uppercase text-stone-500">
          Description
        </label>
        <TextField
          label="Description"
          fullWidth
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
          sx={{ marginBottom: "10px", marginTop: "10px" }}
        />

        <label className="text-sm font-bold uppercase text-stone-500">
          Email
        </label>
        <TextField
          label="Email"
          fullWidth
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={!emailRegex.test(formData.email) && formData.email.length > 0}
          helperText={
            !emailRegex.test(formData.email) && formData.email.length > 0
              ? "Please enter a valid email"
              : ""
          }
          sx={{ marginBottom: "10px", marginTop: "10px" }}
        />

        <label className="text-sm font-bold uppercase text-stone-500">
          Due Date
        </label>
        <div style={{ marginBottom: "10px", marginTop: "10px" }}>
          <DatePicker
            className="w-[50rem] p-1 border-b-2 rounded-sm border-stone-300 bg-stone-50 text-stone-600 focus:outline-none focus:border-stone-600"
            selected={formData.date}
            onChange={(date) => handleChange("date", date)}
            dateFormat="dd.MM.yyyy"
            placeholderText="dd.mm.yyyy"
          />
          {errors.date && <FormHelperText error>{errors.date}</FormHelperText>}
        </div>
      </div>
    </form>
  );
}
