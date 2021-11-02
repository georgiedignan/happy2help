// These are our NPM modules from https://npmjs.com
import React from 'react';
import { Link } from 'react-router-dom'
import "./nav.css";

import { Navbar,NavDropdown,Container } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';

const Nav = () => {
    console.log('rendering nav bar')
    const [loggedIn,setLoggedIn] = useState(localStorage.getItem('token'))

    useEffect(()=>{
        setLoggedIn(localStorage.getItem('token'))
    })

    const logout = () => {
        setLoggedIn(false)
        localStorage.clear()
    }

    return (
         <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <Link to="/">Home</Link>
                </Navbar.Brand>

                <Link to="/Register">Register</Link>

                {
                loggedIn
                ? <button onClick={logout}>Logout</button>
                : <Link to="/login">Login</Link>
                }

            </Container>
        </Navbar>   
    )
}
 
export default Nav


        

       