window.addEventListener('DOMContentLoaded', replaceUsername());

export function replaceUsername() {
    const user = localStorage.getItem('username');
    if(user) {
        let elem = document.querySelector('#userInfo');
        elem.textContent = user;
        elem.style.fontSize = "12px";
        elem.style.alignSelf = 'center';
        elem.style.height = '25px';
    }
}

export function backToLogin() {
    console.log('hello');
    localStorage.removeItem('username');
    window.location.replace('index.html');
}