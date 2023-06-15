import React from 'react';
import {BrowserRouter, NavLink, Route, Routes} from 
'react-router-dom';
import './app.css';
import {Login} from './login/login';
import {Chat} from './chat/chat';
import {Feed} from './feed/feed';
import {Posts} from './posts/posts';

function NotFound() {
    return (
        <main>404: Return to sender. Address unnknown.</main>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <div className='app'>        
                <header className='top'>
                    <h1 className='logo'>DailyDose</h1>
                    <menu className='links'>
                        <NavLink className="link" href="feed.html" to='feed'>Feed</NavLink>
                        <NavLink className="link" href="chat.html" id="chatNav" to='chat'>Chat</NavLink>
                        <NavLink className="link" href="posts.html" to='posts'>Posts</NavLink> 
                    </menu>
                </header>

                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/feed' element={<Feed />} />
                    <Route path='/chat' element={<Chat />} />
                    <Route path='/posts' element={<Posts />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className='bottom'>
                    <p>Bryce Tolman</p>
                    <a href="https://github.com/brycetolman54/startup.git">My GitHub</a>
                </footer>
            </div>
        </BrowserRouter>
    )
}