
let protocol = '';
let socket = '';

window.addEventListener('DOMContentLoaded', async () => {
    const check = await checkUser();
    if(check) {
        return;
    }
    await startingUp();

    // Set the protocol based on what the http server is
    protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    // Make the WebSocket connection at this url, for this user
    socket = new WebSocket(`${protocol}://${window.location.host}/ws?user=${localStorage.getItem('username')}`);

    // When we open the connection
    socket.onopen = () => {
        // Print it out
        console.log(`chats open for ${localStorage.getItem('username')}`);
    };

    // When the connection closes
    socket.onclose = () => {
        // Print it out
        console.log(`chats closed for ${localStorage.getItem('username')}`);
    }

    // When you receive a message
    socket.onmessage = async (event) => {
        // Get the data sent
        const msg = JSON.parse(event.data);
        // Check to see what type it is
        if(msg.which === 'notification') {
            // Turn the green light on or off
            changeStatus(msg.who, msg.status);
        }
        else if(msg.which === 'message') {
            // Put up the message immediately if you have the chat open
            if(localStorage.getItem('openedChat') === msg.from) {
                // Now we can get the ol element that we need to add the message to
                const olEl = document.getElementById('messageList');
                // Now we can add the message
                const liEl = getMessageEl(msg.msg);
                // Add it to the list
                olEl.appendChild(liEl);
                // Scroll down again
                let scrollElement = document.getElementById('messageList');
                scrollElement.scrollTop = scrollElement.scrollHeight;
            }
            // Else, highlight the chat
            else {
                
            }
        }
    }
});

window.addEventListener('unload', () => {
    localStorage.removeItem('active');
    localStorage.removeItem('openedChat');
});

async function checkUser() {
    const user = localStorage.getItem('username');
    if(user) {
        if(await getAuthen(user)) {
            let elem = document.querySelector('#userInfo');
            elem.textContent = user;
            elem.style.fontSize = "15px";
            elem.style.height = 'auto';
            return false;
        }
        else {
            window.location.replace('index.html');
        }
    }
    else {
        window.location.replace('index.html');
    }
    return true;
}

async function getAuthen(user) {
    const result = await fetch(`/api/auth/${user}`);
    if(result.ok) {
        return true;
    }
    return false;
}

async function backToLogin() { 
    localStorage.removeItem('username');
    await fetch('/api/auth/logout', {
        method: 'delete',
    });
    window.location.replace('index.html');
};

// This is what I want my page to do when loading, but also at other times
async function startingUp() {
    // Get the root user
    const response0 = await fetch(`/api/chat/${localStorage.getItem('username')}`);
    const chats = await response0.json();
    // Store the chats on the local for later use
    localStorage.setItem('chats', JSON.stringify(chats));

    // Get the list of users from storage
    const response1 = await fetch('/api/chat/users');
    const users = await response1.json();
        
    // Fill the list with the users who are not the root user and who aren't already chatted with
    for(const user of users) {
        if(!(user.user === localStorage.getItem('username')) && !(chats.find(obj => obj.name === user.user))) {
            fillSelect(user.user);
        }
    }

    // Now we want to populate the conversations list with the chats we have opened
    // Sort the array by time before using it
    const chatList = chats.sort((a,b) => {
        if(a.time > b.time) {
            return -1;
        }
        else if(a.time < b.time) {
            return 1;
        }
        else {
            return 0;
        }
    });

    for(const chat of chatList) {
        placeChat(chat);
    }
}

// This will fill the select menu for making new chats
function fillSelect(user) {
    // Get the user list element to add the options to it
    const userList = document.getElementById('userStart');
    // Make the option to fill it in
    const userSpace = document.createElement('option');
    // Set the id to the name of the user
    userSpace.setAttribute('id', `${user}`);
    // Now make the text the user's name
    userSpace.textContent= `${user}`;
    // Add it to the list
    userList.appendChild(userSpace);
}

// This will fill the chats area with chats the user has
function placeChat(chat) {

    // Access the ol element to add the li element to
    const olEl = document.getElementById('userChatList');

    // Create the li element that is going to hold this info
    const liEl = document.createElement('li');
        // Add its class
        liEl.classList.add('chatGroup');
        // Give it an id of the user who we are talking with
        liEl.setAttribute('id', `${chat.name}`);
        // Set the onclick function to open the chat later
        liEl.setAttribute('onclick', `openChat('${chat.name}')`);
        
        // Create the div class that will hold the user's name
        const div = document.createElement('div');
            // Add the class
            div.classList.add('chatuser');
            // Set the content
            div.textContent = `${chat.name}`;

        // Create the p element that will hold the time
        const p = document.createElement('p');
            // Add the class
            p.classList.add('date');
            // Set the date
            p.textContent = getDate(new Date(chat.time));

        // Create the div that will hold the little green dot
        const dot = document.createElement('div');
            // Add the class
            dot.classList.add('littleDot');
            // If the dot is active, make it green
            const active = localStorage.getItem('active');
            if(active && active.includes(chat.name)) {
                dot.style.backgroundColor = 'green';
                dot.style.border = 'solid green 1px';
            }

        // Now we put it all in the li element
        liEl.appendChild(div);
        liEl.appendChild(p);
        liEl.appendChild(dot);

    // Now we can put the the li in the ol
    olEl.appendChild(liEl);
}

// This gets the time for the date element of the user list
function getDate(time) {
    let value = '';
    let month = time.getMonth() + 1;
    value += month;
    value += '/';
    value += time.getDate();
    value += '/';
    value += time.getFullYear();
    return value;
}

// This gets the time in a string
function getTime(time) {
    let bool = false;
    let value = '';
    let hour = time.getHours();
    if(hour > 12) {
        hour = hour - 12;
        value += hour;
        bool = true;
    }
    else {
        value += hour;
    }
    value += ':';
    if(time.getMinutes() < 10) {
        value += 0;
    }
    value += time.getMinutes();
    value += ' ';
    if(bool) {
        value += 'pm';
    }
    else {
        value += 'am';
    }
    return value;
}

// This will open a chat when it is clicked on from the side menu
function openChat(userId) {

    // Store the opened chat in the local storage for reference
    localStorage.setItem('openedChat', userId);

    // Start by enabling input in the text box
    document.getElementById('messageArea').disabled = false;

    // Now remove the color from the rest of the users in the chatlist
    const userList = document.getElementById('userChatList');
    const users = userList.children;
    for(const user of users) {
        user.style.backgroundColor = 'white';
    }

    // Let's make the box stay colored when we click on it
    const value = document.getElementById(userId);
    value.style.backgroundColor = 'lightblue';

    // Now we need the root users chat list that corresponds to this person
    const chat = JSON.parse(localStorage.getItem('chats')).find(obj => obj.name === userId);

    // Get the actual messages out of that object
    const messages = chat.messages;

    // Then lets make the head of the chat with the users name 
    document.getElementById('userChatter').textContent = `${userId}`;
    document.getElementById('userChatter').style.color = 'black';

    // Now we can get the ol element that we need to add the messages to
    const olEl = document.getElementById('messageList');
    
    // Remove each of the children of the list
    const children = Array.from(olEl.children);
    for(const child of children) {
        olEl.removeChild(child);
    }

    // Now we can make flush out each message and add it to the message list ol
    for(const message of messages) {
        let liEl = getMessageEl(message);
        olEl.appendChild(liEl);
    }

    // Scroll down again
    let scrollElement = document.getElementById('messageList');
    scrollElement.scrollTop = scrollElement.scrollHeight;
}

// this function flushes out each message into its elements to add to the list
function getMessageEl(msg) {
    // First create the li element to add to
    const liEl = document.createElement('li');
        // Add the class
        liEl.classList.add('wholeMessage');
        // Add the id
        liEl.setAttribute('id', `${msg.whose}Message`);

    // Then create the p element for the message
    const text = document.createElement('p');
        // Add its class
        text.classList.add('message');
        // Add the id
        text.setAttribute('id', `${msg.whose}`);
        // Add the message
        text.textContent = msg.message;
    
    // Then create the p element for the time
    const time = document.createElement('p');
        // Add the class
        time.classList.add('time');
        // Add the id
        time.setAttribute('id', `${msg.whose}Time`);
        // Add the time
        time.textContent = getDate(new Date(msg.time)) + ' ' + getTime(new Date(msg.time));

    // Now add the two p elements to the liEl and return it
    liEl.appendChild(text);
    liEl.appendChild(time);
    return liEl;
}

// Gets rid of the list of users when you are starting a new chat
function removeList() {
    const list = document.getElementById('userChatList');
    const childs = Array.from(list.children);
    for(const child of childs) {
        list.removeChild(child);
    }
}

// Gets rid of the select list when you are starting a new chat
function removeSelect() {
    const list = document.getElementById('userStart');
    const childs = Array.from(list.children);
    for(const child of childs) {
        if(child.textContent !== '--Please choose a user--')
        list.removeChild(child);
    }
}

function removeText() {
    const text = document.getElementById('messageArea');
    text.value = '';
    
    const send = document.getElementById('send');
    send.disabled = true;
}

// This function adds the chat object to the chat array of each user
async function startNew() {

    // Get rid of the list that was there, get rid of any text also
    removeList();
    removeText();

    // Get the root user
    // const rootUser = getRootUser();
    const chats = JSON.parse(localStorage.getItem('chats'));

    // Get the user chosen for the new chat
    const newChat = document.getElementById('userStart').value;
    // Then you can delete the data from the select list
    removeSelect();

    // If it is actually a user, start a new chat
    if(newChat !== '--Please choose a user--') {

        // Get the user data array
        // const userData = JSON.parse(localStorage.getItem('userData'));

        // Get the user's object
        // const target = userData.find(obj => obj.name === newChat);

        // Create a new object for the chat in the root users object
        const rootObj = new Object();
            // Add the user that it is with
            rootObj.name = `${newChat}`;
            // Add the time
            rootObj.time = new Date();
            // Add the messages array
            rootObj.messages = [];
            // Add the number
            rootObj.num = chats.length;

        // Add the object to the root users chats
        chats.push(rootObj);
        // Push that back to the server
        await fetch(`/api/chat/${localStorage.getItem('username')}/update/chats`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(chats),
        });

        // Create the object for the chat in the target users object
        const targetObj = new Object();
            // Add the root user
            targetObj.name = `${localStorage.getItem('username')}`;
            // Add the time
            targetObj.time = new Date();
            // Add the messages array
            targetObj.messages = [];
            // Add the number
            // targetObj.num = target.chats.length;

        // Add the object to the target users chats on the server
        // target.chats.push(targetObj);
        await fetch(`/api/chat/new/with/${newChat}`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(targetObj),
        });

        // Add the root and target users back into the userData array
        // userData[rootUser.num] = rootUser;
        // userData[target.num] = target;

        // Put it back to the local storage
        // localStorage.setItem('userData', JSON.stringify(userData));

        // Reload the chats, then choose the one you just made
        await startingUp();
        openChat(newChat);
    }
}

// This will deal with sending the message from one user to the other
async function sendMessage() {

    // Get the userId by looking at the header value
    const userId = document.getElementById('userChatter').textContent;

    // Get the userData for the user and the root, get all userData
    const chats = JSON.parse(localStorage.getItem('chats'));

    // Build the message object in prep to stick it in the array
    const targetObj = new Object();
        // Get the message being sent
        let msg = document.getElementById('messageArea').value;
        targetObj.message = msg;
        // Get the time
        const timeStamp = new Date();
        targetObj.time = timeStamp;
        // Set whose the message is
        targetObj.whose = 'their';

    // Build the object now for the root user
    const rootObj = new Object();
        // Get the message
        rootObj.message = msg;
        // Get the time
        rootObj.time = timeStamp;
        // Set whose it is
        rootObj.whose = 'mine';

    // Add the objects to their respective places, add them to the userData
    // We have to find the right chat in order to add to the messages

        // Add the message to the chats for root
        const rootToTarget = chats.find(obj => obj.name === userId);
        rootToTarget.messages.push(rootObj);
        rootToTarget.time = timeStamp;
        // Update the chats of the root user
        chats[rootToTarget.num] = rootToTarget;
        // Add the chats back to the server
        await fetch(`/api/chat/${localStorage.getItem('username')}/update/chats`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(chats),
        });

        // Send the message to the server for the other user
        await fetch(`/api/chat/${userId}/update/messages/with/${localStorage.getItem('username')}`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({msg: targetObj, time: timeStamp}),
        });

    // Remove all data, open the chat with this user again after startup
    removeList();
    removeSelect();
    removeText();
    socket.send(JSON.stringify({which: 'message', from: `${localStorage.getItem('username')}`, to: `${userId}`, msg: targetObj }));
    await startingUp();
    openChat(userId);
}

// This enables and disables the send button if there is input
function enableSend() {

    // Get the value
    const message = document.getElementById('messageArea');
    const send = document.getElementById('send');

    if(message.value.length > 0 && message.value !== '\u000a') {
        send.disabled = false;
        // If they hit enter, send it
        if(message.value.includes("\u000a")) {
            sendMessage();
            send.disabled = true;
        }
    }
    else {
        send.disabled = true;
    }

}

// This opens the chats page from the bars
function openChats() {
    // Get the elements to manipulate
    let chats = document.getElementById('chats');
    let messages = document.getElementById('chat');

    // Manipulate them on the click
    chats.style.display = 'flex';
    // messages.style.display = 'none';

    // Reset the onclick attribute to go to close chats
    const bars = document.getElementById('bars');
    bars.setAttribute('onclick', 'closeChats()');
}

// This closes the chats page from the bars
function closeChats() {
    
    // Get the elements to manipulate
    let chats = document.getElementById('chats');
    let messages = document.getElementById('chat');

    // Manipulate them on the click
    chats.style.display = 'none';
    // messages.style.display = 'flex';

    // Reset the onclick attribute to go to open chats
    const bars = document.getElementById('bars');
    bars.setAttribute('onclick', 'openChats()');
}

// This is to deal with the WebSockets part of the chat
function changeStatus(who, status) {
    // Get the element for the person
    const person = document.getElementById(who);
    // If the person is there, do stuff
    if(person) {
        // Get the dot
        const dot = person.children[2];
        // Change the look of the dot
        if(status === 'on') {
            dot.style.backgroundColor = 'green';
            dot.style.border = 'solid green 1px';
            const active = JSON.parse(localStorage.getItem('active'));
            if(active) {
                active.push(who);
                localStorage.setItem('active', JSON.stringify(active));
            }
            else {
                const array = [];
                array.push(who);
                localStorage.setItem('active', JSON.stringify(array));
            }
        }
        else if(status === 'off') {
            dot.style.backgroundColor = 'rgb(234, 233, 233)';
            dot.style.border = 'solid grey 1px';
            const active = JSON.parse(localStorage.getItem('active'));
            const result = active.filter((user) => user !== who);
            localStorage.setItem('active', JSON.stringify(result));
        }
    }
}