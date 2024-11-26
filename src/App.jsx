import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import FormProject from "./components/FormProject/FormProject";
import Menu from "./components/Menu/Menu";
import Project from "./components/ProjectComponents/Project";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleSaveProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
    closeForm();
  };

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onOpen={openForm} projects={projects} />
      {!isFormOpen ? (
        // <Menu onOpen={openForm} />
        <Project />
      ) : (
        <FormProject onClose={closeForm} onSave={handleSaveProject} />
      )}
    </main>
  );
}

export default App;
