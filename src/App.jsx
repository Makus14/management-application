import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import FormProject from "./components/FormProject/FormProject";
import Menu from "./components/Menu/Menu";
import Project from "./components/ProjectComponents/Project";

function App() {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [projectIsOpen, setProjectIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();

  const openProject = (project) => {
    setSelectedProject(project);
    setProjectIsOpen(true);
  };

  const closeProject = () => {
    setProjectIsOpen(false);
    setSelectedProject(null);
  };

  const openForm = () => {
    setFormIsOpen(true);
    setProjectIsOpen(false);
  };

  const closeForm = () => {
    setFormIsOpen(false);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.key === updatedProject.key ? updatedProject : project
      )
    );
    setSelectedProject(updatedProject);
  };

  const handleSaveProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
    closeForm();
  };

  const handleDeleteProject = (projectToDelete) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.key !== projectToDelete.key)
    );
    closeProject();
  };

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onOpenForm={openForm}
        onOpenProject={openProject}
        setSelectedProject={setSelectedProject}
        projects={projects}
      />
      {!projectIsOpen ? (
        !formIsOpen ? (
          <Menu onOpen={openForm} />
        ) : (
          <FormProject onCloseForm={closeForm} onSave={handleSaveProject} />
        )
      ) : (
        <Project
          onCloseProject={closeProject}
          selectedProject={selectedProject}
          onUpdateProject={handleUpdateProject}
          onDeleteProject={handleDeleteProject}
        />
      )}
    </main>
  );
}

export default App;
