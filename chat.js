const rootUser = getRootUser();

window.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('username');
    if(user) {
        let elem = document.querySelector('#userInfo');
        elem.textContent = user;
        elem.style.fontSize = "15px";
        elem.style.height = 'auto';
    }
    else {
        window.location.replace('index.html');
    }
    const startUser = localStorage.getItem('startUser');
    localStorage.removeItem('startUser');
    //openChat(startUser);
});

function backToLogin() {
    localStorage.removeItem('username');
    window.location.replace('index.html');
};

function getRootUser() {
    // Get the username
    const username = localStorage.getItem('username');
    // Get the array of the user objects
    const userData = JSON.parse(localStorage.getItem('userData'));
    // Find the username in the list of userData and return that object

    return userData.find(obj => obj.name === username);
}

function getUser(userId) {
    // Get the array of the user objects
    const userData = JSON.parse(localStorage.getItem('userData'));
    // Find the username in the list of userData and return that object
    return userData.find(obj => obj.name === username);
} // Use this any time you need to add stuff to a  user and you only have their id
// Go through functions and erase calls to getRootuser
// Go through and make sure I don't need to use this function anywhere else
// Make sure to setItem in localStorage after you have added to the user and root user

// Function to load the user list into the new message space
window.addEventListener('DOMContentLoaded', () => {
    
    // Get the list of users from storage
    const users = JSON.parse(localStorage.getItem('users'));
    // Fill the list with the users who are not the root user and who aren't already chatted with
    for(const user of users) {
        if(!(user === rootUser.name) && !(rootUser.chats.find(obj => obj.name === user))) {
            fillSelect(user);
        }
    }

    // Now we want to populate the conversations list with the chats we have opened
    const chatList = rootUser.chats;
    for(const chat of chatList) {
        placeChat(chat, rootUser);
    }
})

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
function placeChat(chat, rootUser) {
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

        // Now we put it all in the li element
        liEl.appendChild(div);
        liEl.appendChild(p);

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

    // Start by enabling input in the text box
    document.getElementById('messageArea').disabled = false;

    // Now remove the color from the rest of the users in the chatlist
    const userList = document.getElementById('userChatList');
    const users = userList.children;
    for(const user of users) {
        user.style.backgroundColor = 'white';
    }

    // Let's make the box stay colored when we click on it
    document.getElementById(userId).style.backgroundColor = 'lightblue';

    // Now we need the root users chat list that corresponds to this person
    const chat = rootUser.chats.find(obj => obj.name === userId);

    // Get the actual messages out of that object
    const messages = chat.messages;

    // Then lets make the head of the chat with the users name 
    document.getElementById('userChatter').textContent = `${userId}`;
    document.getElementById('userChatter').style.color = 'black';

    // Now we can get the ol element that we need to add the messages to
    const olEl = document.getElementById('messageList');
    
    // Remove each of the children of the list
    const children = olEl.children;
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

function startNew() {

    // Get the user chosen for the new chat
    const newChat = document.getElementById('userStart').value;
    
    // If it is actually a user, start a new chat
    if(newChat !== '--Please choose a user--') {

        // Set it in local storage for use once the rest of this function finishes
        localStorage.setItem('startUser', newChat);

        // Get the user data array
        const userData = JSON.parse(localStorage.getItem('userData'));

        // Get the user's object
        const target = userData.find(obj => obj.name === newChat);

        // Create a new object for the chat in the root users object
        const rootObj = new Object();
            // Add the user that it is with
            rootObj.name = `${newChat}`;
            // Add the time
            rootObj.time = new Date();
            // Add the messages array
            rootObj.messages = [];

        // Add the object to the root users chats
        rootUser.chats.push(rootObj);

        // Create the object for the chat in the target users object
        const targetObj = new Object();
            // Add the root user
            targetObj.name = `${rootUser.name}`;
            // Add the time
            targetObj.time = new Date();
            // Add the messages array
            targetObj.messages = [];

        // Add the object to the target users chats
        target.chats.push(targetObj);

        // Add the root and target users back into the userData array
        userData[rootUser.num] = rootUser;
        userData[target.num] = target;

        // Put it back to the local storage
        localStorage.setItem('userData', JSON.stringify(userData));

    }
}

function enableSend() {
    if(document.getElementById('messageArea').value.length > 0) {
        document.getElementById('send').disabled = false;
    }
    else {
        document.getElementById('send').disabled = true;
    }
}

function openChats() {
    // Get the elements to manipulate
    let chats = document.getElementById('chats');
    let messages = document.getElementById('chat');

    // Manipulate them on the click
    chats.style.display = 'flex';
    messages.style.display = 'none';

    // Reset the onclick attribute to go to close chats
    const bars = document.getElementById('bars');
    bars.setAttribute('onclick', 'closeChats()');
}

function closeChats() {
        // Get the elements to manipulate
    let chats = document.getElementById('chats');
    let messages = document.getElementById('chat');

    // Manipulate them on the click
    chats.style.display = 'none';
    messages.style.display = 'flex';

    // Reset the onclick attribute to go to open chats
    const bars = document.getElementById('bars');
    bars.setAttribute('onclick', 'openChats()');
}