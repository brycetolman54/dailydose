import React from 'react';
import {BrowserRouter, NavLink, Route, Routes} from 
'react-router-dom';
import './app.css';

import {Login} from './login/login';
import {Chat} from './chat/chat';
import {Feed} from './feed/feed';
import {Posts} from './posts/posts';
import {LikedPosts} from './posts/likedPosts';


function NotFound() {
    return (
        <main>404: Return to sender. Address unnknown.</main>
    )
}

export default function App() {

    const [username, setUsername] = React.useState(localStorage.getItem('username') || '');
    const currentAuthState = username ? true : false;
    const [authState, setAuthState] = React.useState(currentAuthState);
    React.useEffect(() => {
        setAuthState(currentAuthState);
    }, [currentAuthState]);

    const logout = () => {
        localStorage.removeItem('username');
        setAuthState(false);
        window.location.href = '.';
    }

    return (
        <BrowserRouter basename={window.location.pathname || ''}>
            <div className='app'>        
                <header style={{borderBottom: 'solid black', borderBottomWidth: authState ? '0' : '3px' }}className='top'>
                    <h1 className='logo'>DailyDose</h1>
                    {authState && (<menu style={{borderTop: 'solid black 3px'}} className='links'>
                        <NavLink className="link" to='feed'>Feed</NavLink>
                        <NavLink className="link" id="chatNav" to='chat'>Chat</NavLink>
                        <NavLink className="link" to='posts'>Posts</NavLink>
                    </menu>)}
                </header>

                <Routes>
                    <Route exact path='/' element={<Login Login={(username) => {setAuthState(true); setUsername(username); localStorage.setItem('username', username); window.location.href = `./feed`}}/>} />
                    <Route exact path='/feed' element={<Feed username={username} Logout={() => logout()} />} />
                    <Route exact path='/chat' element={<Chat username={username} Logout={() => logout()} />} />
                    <Route exact path='/posts' element={<Posts username={username} Logout={() => logout()} />} />
                    <Route exact path='/likedPosts' element={<LikedPosts username={username} Logout={() => logout()} />} />
                    <Route exact path='*' element={<NotFound />} />
                </Routes>

                <footer className='bottom'>
                    <p>Bryce Tolman</p>
                    <div id='fillIt'>
                        <a href="https://github.com/brycetolman54/startup.git">My GitHub</a>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    )
}
