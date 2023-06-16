import React from 'react';

import './chat.css';

import {OneChat} from './OneChat.jsx';

import {getDate} from '../feed/feed.jsx';

export function Chat() {

    const username = localStorage.getItem('username');

    const [users, setUsers] = React.useState([]);
    const [chats, setChats] = React.useState([]);

    const [display, setDisplay] = React.useState('flex');
    const [show, setShow] = React.useState(true);

    const [chatUser, setChatUser] = React.useState('');

    const setChat = (user) => {
        // Pass this into the chat element
        // It will clear away the messages area
        // The OneChat will return its array of messages that it has created
        // This functin will take that array and set the messagesArray to that array that it is passed after clearing out the other array
        // Make a message component
        // Each OneChat will store their own messages as the array of objects
        // You will take that array and render the messages in a React.useEffect function that rerenders whenever the messagesArray is updated
        // It will update when you open a chat or send a message
        // This function will simply use the setMessagesArray function to update the messages
        // It will also change the value of the chat user
        // The function in the Open chat will change its color
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
    }, []);

    React.useEffect(() => {
        fetch(`/api/chat/${username}`)
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
            if(!(user === username) && !(chats.find(obj => obj.name === user))) {
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
                <OneChat key={i} with={chat.name} time={getDate(new Date(chat.time))} setChat={setChat} unseen={chat.unseen} messages={chat.messages}/>
            );
        }
    }

    const [theChosenOne, setTheChosenOne] = React.useState('');

    const startChat = () => {
        if(theChosenOne && theChosenOne !== '--Choose a user--') {

        const rootObj = {name: theChosenOne, time: new Date(), messages: [], unseen: false};
        const sendChats = chats;
        sendChats.push(rootObj);
        fetch(`/api/chat/${username}/update/chats`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(sendChats),
        });


        
        setUsers(users.filter(obj => obj !== theChosenOne));
        setTheChosenOne('');

        chats.unshift(rootObj);

        }
    }

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
                        <select id="userStart" name="newChatUser" onChange={(e) => setTheChosenOne(e.target.value)} value={theChosenOne}>
                            <option id="selector" defaultValue>--Choose a user--</option>
                            {theUsers}
                        </select>
                        <button id="start" onClick={() => startChat()}>Start</button>
                    </div>
                </aside>
            </div>        
        </main>
    );
}
