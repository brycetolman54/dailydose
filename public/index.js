// These are bool values to check for password and username being good
let usernameGood = true;
let passwordGood = true;

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
    
    let check1 = true;
    let check2 = true;

    if(!(userName.length >= 5) || userName.length === 0) {
        let element = document.querySelector('#checkbox1');
        element.innerText = "\u2716";
        element.style.color = 'red';
        check1 = false;
    }
    else {
        let element = document.querySelector('#checkbox1');
        element.innerText = "\u2714";
        element.style.color = 'green';
        check1 = true;
    }
    if(!(userName.length < 15) || userName.length === 0) {
        let element = document.querySelector('#checkbox2');
        element.innerText = "\u2716";
        element.style.color = 'red';
        check2 = false;
    }
    else {
        let element = document.querySelector('#checkbox2');
        element.innerText = "\u2714";
        element.style.color = 'green';
        check2 = true;
    } 
    
    usernameGood = check1 && check2;

    localStorage.setItem('username', userName);
}

function checkPassword() {
    const passWord = event.target.value;

    let check1 = true;
    let check2 = true;
    let check3 = true;
    let check4 = true;

    if(passWord.length > 8) {
        let element = document.querySelector('#checkbox3');
        element.innerText = "\u2714";
        element.style.color = 'green';
        check1 = true;
     }
    else {
        let element = document.querySelector('#checkbox3');
        element.innerText = "\u2716";
        element.style.color = 'red';
        check1 = false;
    }
    if(/[A-Z]/.test(passWord)) {
        let element = document.querySelector('#checkbox4');
        element.innerText = "\u2714";
        element.style.color = 'green';
        check2 = true;
    }
    else {
        let element = document.querySelector('#checkbox4');
        element.innerText = "\u2716";
        element.style.color = 'red';
        check2 = false;
    }
    if(/[0-9]/.test(passWord)) {
        let element = document.querySelector('#checkbox5');
        element.innerText = "\u2714";
        element.style.color = 'green';
        check3 = true;
    }
    else {
        let element = document.querySelector('#checkbox5');
        element.innerText = "\u2716";
        element.style.color = 'red';
        check3 = false;
    }
    if(/[!@#$%^&amp;\*\(\)]/.test(passWord)) {
        let element = document.querySelector('#checkbox6');
        element.innerText = "\u2714";
        element.style.color = 'green';
        check4 = true;
    }
    else {
        let element = document.querySelector('#checkbox6');
        element.innerText = "\u2716";
        element.style.color = 'red';
        check4 = false;
    }

    passwordGood = check1 && check2 && check3 && check4;
}

function submitForm() {
    // Make a new object for the user
    const obj = new Object;

    // Get the user
    const user = document.getElementById('loginText').value;
    obj.name = user;
    
    // Make a space for their posts
    obj.posts = [];

    // Make a space for their chats with others
    obj.chats = [];

    // Make a place to hold the posts they have liked (just a number)
    obj.likes =  [];

    // Get the users array
    let users = JSON.parse(localStorage.getItem('users'));
    if(!users) {
        localStorage.setItem('users', JSON.stringify([]));
        users = JSON.parse(localStorage.getItem('users'));
    }

    // Get the userData array
    let userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
        localStorage.setItem('userData', JSON.stringify([]));
        userData = JSON.parse(localStorage.getItem('userData'));
    }

    // Give them a number of their location in the array
    obj.num = userData.length;

    // Check it
    if(!users.includes(user) && passwordGood && usernameGood) {
        // Put the user in the list
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        // Put the user data in the data array
        userData.push(obj);
        localStorage.setItem('userData', JSON.stringify(userData));
    }
}