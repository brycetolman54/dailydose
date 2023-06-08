// These are bool values to check for password and username being good
let usernameGood = false;
let passwordGood = false;

function switchForm(toWhat) {

    // Make the error message leave if there is one
    const error = document.getElementById('error');
    error.textContent = '';
    
    if(toWhat === "login") {
        // Make the border on the login and signup change
        let element = document.querySelector('#login');
        element.style.borderWidth = '2px';
        let element2 = document.querySelector('#signup');
        element2.style.borderWidth = '1px';

        // Change the onclick and onkeydown functions to be login and clear the username and password
        const func = document.getElementById('submit');
        func.setAttribute('onclick', "submitForm('login')");
        const username = document.getElementById('loginText');
        username.value = '';
        localStorage.removeItem('username');
        username.setAttribute('onkeydown',`checkEnter(event, 'login')`);
        const password = document.getElementById('password');
        password.value = '';
        password.setAttribute('onkeydown',`checkEnter(event, 'login')`);

        // Clear the checkboxes since it is login and not sign up
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
        const func = document.getElementById('submit');
        func.setAttribute('onclick', "submitForm('signup')");
        const username = document.getElementById('loginText');
        username.value = '';
        localStorage.removeItem('username');
        username.setAttribute('onkeydown',`checkEnter(event, 'signup')`);
        const password = document.getElementById('password');
        password.value = '';
        password.setAttribute('onkeydown',`checkEnter(event, 'signup')`);


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

    if(passWord.length >= 8) {
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

async function submitForm(which) {
    // Make a new object for the user
    const obj = new Object;

    // Get the password
    const password = document.getElementById('password').value;

    // Get the user
    const user = document.getElementById('loginText').value;
    obj.name = user;
    
    // Make a space for their posts
    obj.posts = [];

    // Make a space for their chats with others
    obj.chats = [];

    // Make a place to hold the posts they have liked (just a number)
    obj.likes =  [];

    // Check it
    if(passwordGood && usernameGood) {
        // Put the data into the arrays
        let response = '';
        if(which === 'signup') {
            response = await fetch(`/api/auth/signup`, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({user: user, data: obj, password: password}),
            });
        }
        else if(which === 'login') {
            response = await fetch(`/api/auth/login`, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({user: user, data: obj, password: password}),
            });
        }

        // Now navigate to the feed or remove the username, based on if the user is authentic
        if(response.ok) {
            location.replace('./feed.html');
        }
        else if(which === 'signup') {
            const errMsg = document.getElementById('error');
            errMsg.textContent = '** That user already exists **';
            localStorage.removeItem('username');
        }
        else if(which === 'login') {
            const errMsg = document.getElementById('error');
            errMsg.textContent = '** Incorrect username or password **';
            localStorage.removeItem('username');
        }
    }
}

function checkEnter(event, which) {
    if(event.key === 'Enter') {
        submitForm(which);
    }
}