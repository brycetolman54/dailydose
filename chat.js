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

function openChats() {
    let chats = document.getElementById('chats');
    let messages = document.getElementById('chat');

    chats.style.display = 'flex';
    messages.style.dispaly = 'none';
}

function closeChats() {
    
}