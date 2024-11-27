import React, { createContext, useState, useContext, useEffect } from "react";

const ProjectContext = createContext();

export const useProjectContext = () => {
  return useContext(ProjectContext);
};

export const ProjectProvider = ({ children }) => {
  const loadProjectsFromLocalStorage = () => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  };

  const [projects, setProjects] = useState(loadProjectsFromLocalStorage());
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects]);

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
