import { useState, useEffect } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import ProjectList from "./ProjectList";
import { Project } from "./Project";

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
    

    const saveProject = (project:Project)=>{
        console.log("Saving Project", project);
        let updatedProjects = projects.map((p: Project) => {
             return p.id === project.id ? project : p;
          });
            setProjects(updatedProjects);
    };

    return(
        <>
            <h1>Projects</h1>
            <ProjectList 
            onSave={ saveProject }
            projects={projects}/>
            
        </>
    )
};

export default ProjectsPage;