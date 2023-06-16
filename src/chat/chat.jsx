import React from 'react';

import './chat.css';

export function Chat() {

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

    return (
        <main>
            <div id="topHeader">
                <div id="bars" onClick={() => setShow(!show)}>&#x2630;</div>
                <h2>Chat</h2>
                {/* <div id="userInfo" onclick="backToLogin()">Login</div> */}
            </div>
            <div id="chatSpace">
                <div id="chat">
                    <h2 id="userChatter">Bobbaly</h2>
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
                        <ol id="userChatList"></ol> 
                    </div>
                    <div id="startNew">
                        <label id="startLabel">Start a new message with</label>
                        <select id="userStart" name="newChatUser">
                            {/* <option id="selector" selected>--Please choose a user--</option> */}
                        </select>
                        {/* <button id="start" onclick="startNew()">Start</button> */}
                    </div>
                </aside>
            </div>        
        </main>
    );
}
