window.addEventListener('DOMContentLoaded', () => {
    let scrollElement = document.getElementById('messageList');
    scrollElement.scrollTop = scrollElement.scrollHeight;
});

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

// Function to load the user list into the new message space
window.addEventListener('DOMContentLoaded', () => {
    // Get the root user's object from storage
    const rootUser = getRootUser();
    
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

// This will open a chat when it is clicked on from the side menu
function openChat(userId) {
    
}

// Add a function to start a new chat  based on input, to add it to the current users and the other users chat arrays
// You will need to make each convo id between each pair unique so you can add to it as more messages are sent
// You need to load up the conversation when an old chat is chosen
// The chat array of the user object should hold objects of the other user of the chat and an array of previous messages (these are to be objects with time and text content attributes)
// You need to add a function to make the send and stat buttons disabled if there is no content chosen or typed

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