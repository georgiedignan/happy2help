import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage = () => {
    return (
        <section class="container">
            <div class="left-half">
                <article>
                    <style>
                    @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@500&family=Source+Code+Pro:ital,wght@1,300&family=Work+Sans:wght@300&display=swap');
                    </style>
                    <h1>Happy2Help</h1>
                    <h4>connecting small businesses to technology resources</h4>
                </article>  
            </div>

            <div class="right-half">
                <article>
                    < LoginForm />
                </article>  
            </div>
        </section>
        

        
            
    )
}


export default LoginPage;