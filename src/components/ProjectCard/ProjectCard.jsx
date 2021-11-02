import React from 'react'
import { Link } from "react-router-dom"

import "./ProjectCard.css";

const ProjectCard = (props) => {
    const { projectData } = props
    return (
    <div id="center-project-cards">
        <div className="project-card">
        <Link to={`/project/${projectData.id}`}>
            <img 
                alt="projectData"
                src={projectData.image}
            />
            <h3>{projectData.title}</h3>
            {/* <h4>{projectData.description}</h4> */}
            <h4>{projectData.amount}</h4>
            <h4>{projectData.is_open}</h4>
            <h4>{projectData.category}</h4>

        </Link>
        </div>
    </div>
    
    );
}

export default ProjectCard;