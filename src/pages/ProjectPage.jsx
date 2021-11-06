import React, { useState, useEffect } from 'react'
import { Form,Button } from 'react-bootstrap';
import { useParams, useHistory } from "react-router-dom";

const ProjectPage = () => {
    const [projectData, setProjectData] = useState({pledges: [] });
    const [isEditing, setIsEditing] = useState(false);
    const history = useHistory();

    const { id: project_id } = useParams();
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects/${project_id}`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            setProjectData(data);
        });
    }, [project_id]);

    // What can we edit in a page
    // Title, description, goal, image, is_open

    const handleChange = (event) => {
        const { id, value } = event.target
        setProjectData({
            ...projectData,
            [id]:value

        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("Hello")

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}projects/${project_id}`,
            {
            method: "put",
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

        setIsEditing(false)

        console.log("Bye", response)
    }



    const ReadProject = () => {
        return (
            <div>
                <img class="centre-page" id="project-img" src={projectData.image} alt="Project Image"></img>
                <div class="centre-page" id="background-box">
                    <h2 class="centre-text" >{projectData.title}</h2>
                    <h3 class="centre-text" >Created at: {projectData.date_created}</h3>
                    <h3 class="centre-text" >{`Project Status: ${projectData.is_open}`}</h3>
                    <h3 class="centre-text" >For Profit? {projectData.not_for_profit}</h3>
                    <h4 class="centre-text" >Amount: {projectData.amount}</h4>
                    <h4 class="centre-text" >Category: {projectData.category}</h4>
                    <h4 class="centre-text" >Location: {projectData.location}</h4>
                    <h4 class="centre-text" >{projectData.description}</h4>
                    <h4 class="centre-text" >Pledges:</h4>
                    <ul>
                        {projectData.pledges.map((pledgeData, key) =>{
                            return (
                            <li key={key}>
                                {pledgeData.amount} from {pledgeData.supporter}
                            </li>
                                );
                    })}
                    </ul>
                </div>
            </div>

        )
    }

    const deleteProject = async () => {
        console.log("deleting")
        await fetch(`${process.env.REACT_APP_API_URL}projects/${project_id}`, 
        {   
            method: "delete",
            headers: {
                "Authorization": `token ${window.localStorage.getItem("token")}`
            }
        })
        console.log("deleted")
        history.push("/")
    }

    console.log("Project data is:",projectData)

    return (
        <div>
            {
            localStorage.getItem('token') 
            && isEditing == false
            && <button onClick={() => setIsEditing(true)}>Edit Project</button>
            }
            {
            localStorage.getItem('token')
            && <button onClick={deleteProject}>Delete Project</button>  
            }
            <div>
            {
                isEditing
                ? (
                    <div class="centre-page">
                        <Form>
                        <Form.Group className="mb-3" controlId="ControlInput">
                            <Form.Label htmlFor="IsOpen">Project Status</Form.Label>
                            <Form.Select aria-label="Default select example"
                            onChange={handleChange}>
                                <option>{projectData.is_open}</option>
                                <option value="1">true</option>
                                <option value="2">false</option>
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
                                    onClick={() => setIsEditing(false)}
                                    >Cancel
                                </Button>
                            </div>
        
                        </section>

                    </Form>
                    </div>
                    
                )
                : <ReadProject />

            }
            </div>
            
        </div>
    )
}



export default ProjectPage


        