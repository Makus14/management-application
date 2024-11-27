import React, { createContext, useState, useContext } from "react";

const ProjectContext = createContext();

export const useProjectContext = () => {
  return useContext(ProjectContext);
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const addProject = (project) => {
    setProjects((prevProjects) => [...prevProjects, project]);
  };

  const updateProject = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.key === updatedProject.key ? updatedProject : project
      )
    );
    setSelectedProject(updatedProject);
  };

  const deleteProject = (projectToDelete) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.key !== projectToDelete.key)
    );
    setSelectedProject(null);
  };

  const setSelected = (project) => {
    setSelectedProject(project);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        selectedProject,
        addProject,
        updateProject,
        deleteProject,
        setSelected,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
