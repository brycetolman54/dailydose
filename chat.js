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
});

function backToLogin() {
    localStorage.removeItem('username');
    window.location.replace('index.html');
};

// Function to load the user list into the new message space
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