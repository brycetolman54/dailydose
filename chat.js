window.addEventListener('DOMContentLoaded', () => {
    console.log('hello');
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