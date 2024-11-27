import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import FormProject from "./components/FormProject/FormProject";
import Menu from "./components/Menu/Menu";
import Project from "./components/ProjectComponents/Project";
import {
  ProjectProvider,
  useProjectContext,
} from "../src/components/ProjectContext.jsx";

function App() {
  const { projects, selectedProject, setSelected, addProject } =
    useProjectContext();
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [projectIsOpen, setProjectIsOpen] = useState(false);

  const openProject = (project) => {
    setSelected(project);
    setProjectIsOpen(true);
  };

  const closeProject = () => {
    setProjectIsOpen(false);
    setSelected(null);
  };

  const openForm = () => {
    setFormIsOpen(true);
    setProjectIsOpen(false);
  };

  const closeForm = () => {
    setFormIsOpen(false);
  };

  const handleSaveProject = (newProject) => {
    addProject(newProject);
    closeForm();
  };

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onOpenForm={openForm}
        onOpenProject={openProject}
        projects={projects}
      />
      {!projectIsOpen ? (
        !formIsOpen ? (
          <Menu onOpen={openForm} />
        ) : (
          <FormProject onCloseForm={closeForm} onSave={handleSaveProject} />
        )
      ) : (
        <Project onCloseProject={closeProject} />
      )}
    </main>
  );
}

const AppWithProvider = () => (
  <ProjectProvider>
    <App />
  </ProjectProvider>
);

export default AppWithProvider;
