import React from 'react';
import {BrowserRouter, NavLink, Route, Routes} from 
'react-router-dom';
import './app.css';

export default function App() {
    return (
        <BrowserRouter>
            <div className='app'>        
                <header>
                    <h1>DailyDose</h1>
                    <menu>
                        <NavLink className="link" href="feed.html" to='feed'>Feed</NavLink>
                        <NavLink className="link" href="chat.html" id="chatNav" to='chat'>Chat</NavLink>
                        <NavLink className="link" href="posts.html" to='posts'>Posts</NavLink> 
                    </menu>
                </header>

                <main>Content Here</main>

                <footer>
                    <p>Bryce Tolman</p>
                    <a href="https://github.com/brycetolman54/startup.git">My GitHub</a>
                </footer>
            </div>
        </BrowserRouter>
    )
}