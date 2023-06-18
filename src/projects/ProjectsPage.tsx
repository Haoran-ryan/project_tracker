import { useState, useEffect } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import ProjectList from "./ProjectList";
import { Project } from "./Project";
import { projectAPI} from "./projectAPI";

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|undefined>(undefined);

    useEffect(() => {
        setLoading(true);
        projectAPI
            .get(1)
            .then((data)=>{
                setError('');
                setLoading(false);
                setProjects(data);
            })
            .catch((e)=>{
                setLoading(false);
                setError(e.message);
                if(e instanceof Error){
                    setError(e.message)
                }
            });
    }, []);


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
            {error &&(
                <div className="card large error">
                    <section>
                        <p>
                            <span className="icon-altert inverse"></span>
                            {error}
                        </p>
                    </section>
                </div>
            )}
            <ProjectList 
            onSave={ saveProject }
            projects={projects}/>
            {loading &&(
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading ... </p>
                </div>
            )}
        </>
    )
};

export default ProjectsPage;