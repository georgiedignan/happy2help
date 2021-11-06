import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

import "./LoginForm.css";

function LoginForm() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const history = useHistory();
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [id]: value,
        }));
    };
    
    const postData = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}api-token-auth/`,
            {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        }
        );
        return response.json();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username && credentials.password){
        postData().then((response) => {
        window.localStorage.setItem("token", response.token);
        console.log(window.location)
        window.location=`${window.location.origin}/`
        // history.push("/");
        console.log(response);
        });
        }
    };
    
    return (
        <section id="login-container">
            <div>
                <div>
                    <h3>Sign In</h3>
                </div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            id="username"
                            placeholder="Enter username"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            id="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </Form.Group>


                    <Button id="submit-button"
                    variant="primary" 
                    type="submit"
                    onClick={handleSubmit}
                    >
                        Submit
                    </Button>
            </Form>
            </div>
            
        </section>
    );
}

export default LoginForm