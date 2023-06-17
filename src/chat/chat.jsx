import React from 'react';

import './chat.css';

import {OneChat} from './OneChat.jsx';

import {Message} from './Message.jsx';

import {getDate} from '../feed/feed.jsx';

export function Chat(props) {

    const [users, setUsers] = React.useState([]);
    const [chats, setChats] = React.useState([]);

    const [display, setDisplay] = React.useState('flex');
    const [show, setShow] = React.useState(true);

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
        fetch(`/api/chat/${props.username}`)
            .then(response => response.json())
            .then(data => {
                data = data.sort((a,b) => {if(a.time > b.time) {return -1;} else if(a.time < b.time) {return 1;} else {return 0;}});
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
            if(!(user === props.username) && !(chats.find(obj => obj.name === user))) {
                theUsers.push(
                    <option key={i} id={user}>{user}</option>
                );
            }
        }
    }

    const [openChat, setOpenChat] = React.useState('');
    const [chatUser, setChatUser] = React.useState('');
    const [messages, setMessages] = React.useState([]);

    const setChat = (user, myMessages) => {

        fetch(`/api/chat/${props.username}/with/${user}/unseen/false`, {
            method: 'POST',
            headers: {'content-type': 'application/json'}
        });

        setOpenChat(user);
        setChatUser(user);

        const theMessages = [];
        if(myMessages) {
            for(const [i, msg] of myMessages.entries()) {
                theMessages.push(<Message key={i} time={msg.time} msg={msg.message} whose={msg.whose} />);
            }
        }
        setMessages(theMessages);
        
    }

    const theChats = [];
    if(chats.length) {
        for(const [i,chat] of chats.entries()) {
            theChats.push(
                <OneChat key={i} with={chat.name} time={getDate(new Date(chat.time))} setChat={() => setChat(chat.name, chat.messages)} unseen={chat.unseen} open={openChat} />
            );
        }
    }

    const [theChosenOne, setTheChosenOne] = React.useState('');

    const startChat = () => {
        if(theChosenOne && theChosenOne !== '--Choose a user--') {

        const rootObj = {name: theChosenOne, time: new Date(), messages: [], unseen: false};
        chats.unshift(rootObj);
        fetch(`/api/chat/${props.username}/update/chats`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(chats),
        });
        
        const targetObj = {name: props.username, time: new Date(), messages: [], unseen: false};
        fetch(`/api/chat/new/with/${theChosenOne}`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(targetObj),
        });

        // SEND A MESSAGE THROUGH SOCKET
        
        setUsers(users.filter(obj => obj !== theChosenOne));
        setTheChosenOne('');

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
                        <ol id="messageList">{messages}</ol>
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
