import React, { useState, useEffect } from 'react'

import { Form,Button } from 'react-bootstrap';

// These are our components
import ProjectCard from '../components/ProjectCard/ProjectCard'

const HomePage = () => {
    const [projectList, setProjectList] = useState([]);
    // use state to add project pledges

    const [projectData, setProjectData] = useState({pledges: [] });
    const [addProject, setAddProject] = useState(false);

   
    const getProjects = () => {
        fetch(`${process.env.REACT_APP_API_URL}projects`).
        then((results) => {
            return results.json();
        })
        .then((data) => {
            setProjectList(data);
        });
    }

    useEffect(() => {
        getProjects()
    }, []);

    // add the button to the below

    const handleChange = (event) => {
        const { id, value } = event.target
        console.log(id,value)
        setProjectData({
            ...projectData,
            [id]:value

        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("Hello", projectData)

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}projects/`,
            {
            method: "post",
            headers: {
                "Authorization": `Token ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: projectData.title,
                is_open: projectData.is_open,
                description: projectData.description,
                amount: projectData.amount,
                image: projectData.image,
                location: projectData.location,
                category: projectData.category

            }
            ),
        }
        );

        getProjects()

        setAddProject(false)

        console.log("Bye", response)
    }

    return (
        <div>
             {
            localStorage.getItem('token') 
            && addProject == false
            && <button 
            onClick={() => setAddProject(true)}
            id="AddProject"
            >Add Project</button>
            }
            <div>
                {
                addProject
                ? (
                    <div class="centre-page">
                        <Form>
                        <Form.Group className="mb-3" controlId="ControlInput">
                            <Form.Label htmlFor="IsOpen">Project Status</Form.Label>
                            <Form.Select id="is_open" aria-label="Default select example"
                            onChange={handleChange}>
                                <option>{projectData.is_open}</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </Form.Select>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="ControlInput">
                            <Form.Label htmlFor="ProjectTitle">Project Title:</Form.Label>
                            <Form.Control
                                value={projectData.title}
                                type="text"
                                id="title"
                                placeholder="Title"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label htmlFor="ProjectDescription">Project Description:</Form.Label>
                            <Form.Control
                                value={projectData.description}
                                type="text"
                                id="description"
                                placeholder="Project Description"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="Amount">Goal:</Form.Label>
                            <Form.Control
                                value={projectData.amount}
                                type="number"
                                id="amount"
                                placeholder=""
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="Location">Location:</Form.Label>
                            <Form.Control
                                value={projectData.location}
                                type="text"
                                id="location"
                                placeholder="Location"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ControlInput">
                            <Form.Label htmlFor="Category">Category</Form.Label>
                            <Form.Select  id="category"aria-label="Default select example"
                            onChange={handleChange}>
                                <option>{projectData.category}</option>
                                <option value="Front-end Website Design">Front-end Website Design</option>
                                <option value="Back-end Design">Back-end Design</option>
                                <option value="Mobile application Design">Mobile application Design</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="Image">Image Url</Form.Label>
                            <Form.Control
                                value={projectData.image}
                                type="text"
                                id="image"
                                placeholder="Image"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <section class="container">
                            <div id="left-half_addProject">
                                <Button 
                                    variant="primary" 
                                    type="submit"
                                    onClick={handleSubmit}
                                    >Done
                                </Button>
                            </div>

                            <div id="right-half_addProject">
                                <Button 
                                    variant="primary"
                                    onClick={() => setAddProject(false)}
                                    >Cancel
                                </Button>
                            </div>
        
                        </section>

                    </Form>
                    </div>
                    
                )
                :
               <div id="center-project-cards">
                    <div id="project-list">
                        {projectList.map((projectData, key) => {
                            return <ProjectCard key={key} projectData={projectData}/>;
                        })}
                    </div>
                </div>

            }
            </div>
        </div>
        
        
    );

    
}

export default HomePage