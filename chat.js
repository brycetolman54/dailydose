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
        console.log('what');
        window.location.replace('index.html');
    }
});

function backToLogin() {
    localStorage.removeItem('username');
    window.location.replace('index.html');
};

function getRootUser() {
    // Get the username
    const username = JSON.parse(localStorage.getItem('username'));
    // Get the array of the user objects
    const userData = JSON.parse(localStorage.getItem('userData'));
    // Find the username in the list of userData and return that object
    const rootUser = userData.find(obj => obj.name === username);
    console.log(rootUser);
    return rootUser;
}

// Function to load the user list into the new message space
window.addEventListener('DOMContentLoaded', () => {
    // Get the root user's object from storage
    const rootUser = getRootUser();
    
    // Get the list of users from storage
    const users = JSON.parse(localStorage.getItem('users'));
    // Fill the list with the users who are not the root user and who aren't already chatted with
    for( const user of users) {
        fillSelect(user);
    }
})
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
// Compare the whole user list to the list of people the current user has chats with
// You also have to load the user list colun with people the current user has chats with
// Add a function to start a new chat  based on input, to add it to the current users and the other users chat arrays
// You will need to make each convo id between each pair unique so you can add to it as more messages are sent
// You need to load up the conversation when an old chat is chosen
// The chat array of the user object should hold objects of the other user of the chat and an array of previous messages (these are to be objects with time and text content attributes)

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