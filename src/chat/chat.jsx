import React from 'react';

import './chat.css';

import {OneChat} from './OneChat.jsx';

import {Message} from './Message.jsx';

import {getDate} from '../feed/feed.jsx';

export function Chat(props) {

    React.useEffect(() => {

        checkUser();
        
    }, [props.username]);

    async function checkUser() {

        if(props.username) {
            if(await getAuthen(props.username)) {
                // Do nothing
            }
            else {
                props.Logout();          
            }
        }
        else {
            props.Logout();
        }
    }

    async function getAuthen(username) {
        const result = await fetch(`/api/auth/${username}`);
        if(result.ok) {
            return true;
        }
        return false;
    }

    const [users, setUsers] = React.useState([]);
    const [chats, setChats] = React.useState([]);

    const [display, setDisplay] = React.useState('flex');
    const [show, setShow] = React.useState(true);

    const [theMessage, setTheMessage] = React.useState(''); 
    const [disabled, setDisabled] = React.useState(true);
    const [activeUsers, setActiveUsers] = React.useState([]);
    
    const [chatUser, setChatUser] = React.useState('');
    const [openChat, setOpenChat] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    
    const [theChosenOne, setTheChosenOne] = React.useState('');

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

    const theChats = [];
    if(chats.length) {
        for(const [i,chat] of chats.entries()) {
            theChats.push(
                <OneChat key={i} with={chat.name} time={getDate(new Date(chat.time))} setChat={() => setChat(chat.name, chat.messages)} unseen={chat.unseen} open={openChat} active={activeUsers}/>
            );
        }
    }

    React.useEffect(() => {
        if(openChat === '') {
            setOpenChat(chatUser);
        }
    }, [openChat]);

    React.useEffect(() => {
        setOpenChat(chatUser);
    }, [chatUser]);

    const setChat = (user, myMessages) => {

        fetch(`/api/chat/${props.username}/with/${user}/unseen/false`, {
            method: 'POST',
            headers: {'content-type': 'application/json'}
        });

        setOpenChat(user);
        setChatUser(user);
        setDisabled(false);

        const theMessages = [];
        if(myMessages.length > 0) {
            for(const [i, msg] of myMessages.entries()) {
                theMessages.push(<Message key={i} time={msg.time} msg={msg.message} whose={msg.whose} />);
            }
        }
        setMessages(theMessages);
    }

    const scrollRef = React.useRef(null);
    React.useEffect(() => {
        const scrollEl = scrollRef.current;
        if(scrollEl) {
            scrollEl.scrollTop = scrollEl.scrollHeight;
        }
    }, [messages]);


    const [socket, setSocket] = React.useState();

    React.useEffect(() => {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://localhost:4000/ws?user=${props.username}`);
        setSocket(socket);

        socket.onopen = () => {
            console.log(`chats open for ${props.username}`);
        };
        socket.onclose = () => {
            console.log(`chats closed for ${props.username}`);
        };
        socket.onmessage = async (event) => {
            const msg = JSON.parse(event.data);
            if(msg.which === 'notification') {
                if(msg.status === 'on') {
                    setActiveUsers(lastActive => [...lastActive, msg.who]);
                }
                else if(msg.status === 'off') {
                    activeUsers.splice(activeUsers.findIndex((o, i) => o === msg.who ), 1);
                    setActiveUsers(lastActive => lastActive.filter(user => user !== msg.who));
                }
            }
            else if(msg.which === 'message') {

                const timeStamp = new Date();

                const chats = JSON.parse(localStorage.getItem('chats'));
                const theChat = chats.find((o) => o.name === msg.from);
                const chatIndex = chats.findIndex((o,i) => o.name === msg.from);
                    
                theChat.time = timeStamp;
                theChat.messages.push(msg.msg); 
                theChat.unseen = true;
        
                chats.splice(chatIndex, 1);
                chats.unshift(theChat);
                setChats(chats);
                localStorage.setItem('chats', JSON.stringify(chats));

                // Put up the message immediately if you have the chat open
                if(document.getElementById('userChatter').textContent === msg.from) {

                    const length = document.getElementById('messageList').children.length;

                    setMessages(oldMessages => [...oldMessages, <Message key={length} time={msg.msg.time} msg={msg.msg.message} whose={msg.msg.whose} />]);

                    // // Update the unseen value in DB
                    await fetch(`/api/chat/${localStorage.getItem('username')}/with/${msg.from}/unseen/false`, {
                        method: 'POST',
                        headers: {'content-type': 'application/json'}, 
                    });

                    setOpenChat(chatUser);

                    setActiveUsers(oldActive => [...oldActive]);
                }
                // Else, highlight the chat
                else {

                    setOpenChat(chatUser);

                    setActiveUsers(oldActive => [...oldActive]);
                    
                }
            }
            else if(msg.which === 'startNew') {

                setChats((oldChats) => [msg.chat, ...oldChats]);

                setActiveUsers(oldActive => [msg.from, ...oldActive]);

                setOpenChat(chatUser);
            }
        };
        return () => {
            socket.close();
        };
    }, []);

    const startChat = () => {
        if(theChosenOne && theChosenOne !== '--Choose a user--') {

            const rootObj = {name: theChosenOne, time: new Date(), messages: [], unseen: true};
            chats.unshift(rootObj);
            fetch(`/api/chat/${props.username}/update/chats`, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(chats),
            });

            setChatUser(theChosenOne);
            setOpenChat('');
            
            const targetObj = {name: props.username, time: new Date(), messages: [], unseen: true};
            fetch(`/api/chat/new/with/${theChosenOne}`, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(targetObj),
            });
    
            socket.send(JSON.stringify({which: 'startNew', chat: targetObj, to: theChosenOne, from: props.username}));

            setUsers(users.filter(obj => obj !== theChosenOne));
            
            setActiveUsers(oldActive => [...oldActive]);
        }
    }

    const sendMessage = async () => {

        const timeStamp = new Date();

        const theChat = chats.find((o) => o.name === chatUser);
        const chatIndex = chats.findIndex((o,i) => o.name === chatUser);

        const rootObj = {message: theMessage, time: timeStamp, whose: 'mine'};

        theChat.time = timeStamp;
        theChat.messages.push(rootObj); 

        chats.splice(chatIndex, 1);
        chats.unshift(theChat);

        localStorage.setItem('chats', JSON.stringify(chats));

        await fetch(`/api/chat/${props.username}/update/chats`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(chats),
        });

        const targetObj = {message: theMessage, time: timeStamp, whose: 'their'};

        await fetch(`/api/chat/${chatUser}/update/messages/with/${props.username}`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({msg: targetObj, time: timeStamp}),
        });


        const length = document.getElementById('messageList').children.length;

        setMessages(oldMessages => [...oldMessages, <Message key={length} time={rootObj.time} msg={rootObj.message} whose={rootObj.whose} />]);

        fetch(`/api/chat/${chatUser}/with/${props.username}/unseen/true`, {
            method: 'POST',
            headers: {'content-type': 'application/json'}, 
        });

        socket.send(JSON.stringify({which: 'message', from: props.username, to: openChat, msg: targetObj }));

        setTheMessage(''); 

        setActiveUsers(oldActive => [...oldActive]);

        setOpenChat('');
    }

    return (
        <main>
            <div id="topHeader">
                <div id="bars" onClick={() => setShow(!show)}>&#x2630;</div>
                <h2>Chat</h2>
                <div id="userInfo" onClick={() => props.Logout()}>{props.username}</div>
            </div>
            <div id="chatSpace">
                <div id="chat">
                    <h2 id="userChatter">{chatUser}</h2>
                    <div id="messageSpace">
                        <ol ref={scrollRef} id="messageList">{messages}</ol>
                    </div>
                    <div id="newMessage">
                        <textarea id="messageArea" onChange={(e) => setTheMessage(e.target.value)} disabled={disabled} onKeyDown={(e) => {if(e.key === 'Enter'){if((theMessage.length > 0 && theMessage !== '\n')){e.preventDefault(); sendMessage();} else{setTheMessage('');}}}} value={theMessage}></textarea>
                        <button id="send" disabled={!theMessage && !(false)} onClick={() => {sendMessage(); setOpenChat(chatUser)}}>Send</button>
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
                        <button id="start" onClick={() => {startChat(); setTheChosenOne('');}}>Start</button>
                    </div>
                </aside>
            </div>        
        </main>
    );
}