// These are our NPM modules from https://npmjs.com
import React from 'react';
// import { Link } from 'react-router-dom'
import "./Header.css";

// create an img tag below linking the header image to the homepage
function Header() {
    return (

        <div id="header" id="header-centre-text">
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@500&family=Source+Code+Pro:ital,wght@1,300&family=Work+Sans:wght@300&display=swap');
            </style>
            <h1>H2H</h1>
            <p>connecting small businesses to technology resources</p>
            {/* <a href="http://localhost:3000/">
                <h1>HAPPY 2 HELP</h1>
            </a> */}
        </div>
    )
}

 
export default Header