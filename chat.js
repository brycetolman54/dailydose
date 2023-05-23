window.addEventListener('DOMContentLoaded', () => {
    console.log('hello');
    let scrollElement = document.getElementById('messageList');
    scrollElement.scrollTop = scrollElement.scrollHeight;
});