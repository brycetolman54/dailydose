import React from 'react';

import './chat.css';

import {OneChat} from './OneChat.jsx';

import {getDate} from '../feed/feed.jsx';

export function Chat() {

    const [users, setUsers] = React.useState([]);
    const [chats, setChats] = React.useState([]);

    const [display, setDisplay] = React.useState('flex');
    const [show, setShow] = React.useState(true);

    const [chatUser, setChatUser] = React.useState('');

    const setChat = (user) => {
        // Pass this into the chat element
        setChatUser(user);
    }

    React.useEffect(() => {
        if(show) {
            setDisplay('flex');
        }
        else if(!show) {
            setDisplay('none');
        }
    }, [show]);

    React.useEffect(() => {
        fetch('/api/chat/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                localStorage.setItem('users', JSON.stringify(data));
            })
            .catch(() => {
                const usersText = localStorage.getItem('users');
                if(usersText) {
                    setUsers(usersText);
                }
            });
        fetch(`/api/chat/${localStorage.getItem('username')}`)
            .then(response => response.json())
            .then(data => {
                setChats(data);
                localStorage.setItem('chats', JSON.stringify(data));
            })
            .catch(() => {
                const chatsText = localStorage.getItem('chats');
                if(chatsText) {
                    setChats(JSON.parse(chatsText));
                }
            });
    }, []);

    const theUsers = [];
    if(users.length) {
        for(const [i, user] of users.entries()) {
            if(!(user === localStorage.getItem('username')) && !(chats.find(obj => obj.name === user))) {
                theUsers.push(
                    <option key={i} id={user}>{user}</option>
                );
            }
        }
    }

    const theChats = [];
    if(chats.length) {
        for(const [i,chat] of chats.entries()) {
            theChats.push(
                <OneChat key={i} with={chat.name} time={getDate(new Date(chat.time))} setChat={setChat} />
            );
        }
    }

    const [theChosenOne, setTheChosenOne] = React.useState('');

    const changeTheChosenOne = (iChooseYou) => {
        setTheChosenOne(iChooseYou.target.value);
    };

    return (
        <main>
            <div id="topHeader">
                <div id="bars" onClick={() => setShow(!show)}>&#x2630;</div>
                <h2>Chat</h2>
                {/* <div id="userInfo" onclick="backToLogin()">Login</div> */}
            </div>
            <div id="chatSpace">
                <div id="chat">
                    <h2 id="userChatter">{chatUser}</h2>
                    <div id="messageSpace">
                        <ol id="messageList"></ol>
                    </div>
                    <div id="newMessage">
                        {/* <textarea id="messageArea" name="message" required oninput="enableSend()" disabled onkeydown="checkEnter(event)"></textarea> */}
                        {/* <button id="send" disabled="false" onclick="sendMessage()">Send</button> */}
                    </div>
                </div>
                <aside id="chats" style={{display: display}}>
                    <h3 id="chatHead">Conversations</h3>
                    <div id="container">
                        <ol id="userChatList">{theChats}</ol> 
                    </div>
                    <div id="startNew">
                        <label id="startLabel">Start a new message with</label>
                        <select id="userStart" name="newChatUser" onChange={changeTheChosenOne}>
                            <option id="selector" defaultValue>--Please choose a user--</option>
                            {theUsers}
                        </select>
                        {/* <button id="start" onclick="startNew()">Start</button> */}
                    </div>
                </aside>
            </div>        
        </main>
    );
}
