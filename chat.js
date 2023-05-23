import { replaceUsername } from "./feed";
import { backToLogin } from "./feed";

window.addEventListener('DOMContentLoaded', () => {
    console.log('hello');
    let scrollElement = document.getElementById('messageList');
    scrollElement.scrollTop = scrollElement.scrollHeight;
});

window.addEventListener('DOMContentLoaded', replaceUsername());
