function switchForm(toWhat) {
    if(toWhat === "login") {
        let element = document.querySelector('#login');
        element.style.borderWidth = '2px';
        let element2 = document.querySelector('#signup');
        element2.style.borderWidth = '1px';

        let filler = document.querySelectorAll('.filler');
        for(let fill of filler) {
            fill.style.display = 'none';
        }
    }
    if(toWhat === "signup") {
        let element = document.querySelector('#signup');
        element.style.borderWidth = '2px';
        let element2 = document.querySelector('#login');
        element2.style.borderWidth = '1px';

        let filler = document.querySelectorAll('.filler');
        for(let fill of filler) {
            fill.style.display = 'grid';
        }
    }
};

function checkUsername() {
    const userName = event.target.value;

    if((!userName.length > 8) || userName.length === 0) {
        let element = document.querySelector('#checkbox1');
        element.innerText = "\u2716";
        element.style.color = 'red';
    }
    else {
        let element = document.querySelector('#checkbox1');
        element.innerText = "\u2714";
        element.style.color = 'green';
    }
    if(!(userName.length < 15) || userName.length === 0) {
        let element = document.querySelector('#checkbox2');
        element.innerText = "\u2716";
        element.style.color = 'red';
    }
    else {
        let element = document.querySelector('#checkbox2');
        element.innerText = "\u2714";
        element.style.color = 'green';
    }    

    localStorage.setItem('username', userName);
}

function checkPassword() {
    const passWord = event.target.value;

    if(passWord.length > 8) {
        let element = document.querySelector('#checkbox3');
        element.innerText = "\u2714";
        element.style.color = 'green';
     }
    else {
        let element = document.querySelector('#checkbox3');
        element.innerText = "\u2716";
        element.style.color = 'red';
    }
    if(/[A-Z]/.test(passWord)) {
        let element = document.querySelector('#checkbox4');
        element.innerText = "\u2714";
        element.style.color = 'green';
    }
    else {
        let element = document.querySelector('#checkbox4');
        element.innerText = "\u2716";
        element.style.color = 'red';
    }
    if(/[0-9]/.test(passWord)) {
        let element = document.querySelector('#checkbox5');
        element.innerText = "\u2714";
        element.style.color = 'green';
    }
    else {
        let element = document.querySelector('#checkbox5');
        element.innerText = "\u2716";
        element.style.color = 'red';
    }
    if(/[!@#$%^&amp;\*\(\)]/.test(passWord)) {
        let element = document.querySelector('#checkbox6');
        element.innerText = "\u2714";
        element.style.color = 'green';
    }
    else {
        let element = document.querySelector('#checkbox6');
        element.innerText = "\u2716";
        element.style.color = 'red';
    }
}

function submitForm() {
    // Get the user
    const user = document.getElementById('loginText').value;

    // Get the users array
    const users = JSON.parse(localStorage.getItem('users'));

    // Check it
    if(!users.includes(user)) {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
}