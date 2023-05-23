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

     if(userName.match(/\w{5,}/)) {
        let element = document.querySelector('#checkbox1');
        element.innerText = "\u2714";
        element.style.color = 'green';
    }
     else {
        let element = document.querySelector('#checkbox1');
        element.innerText = "\u2716";
        element.style.color = 'red';
     }
     if(userName.match(/\w{1,15}/)) {
        let element = document.querySelector('#checkbox15');
        element.innerText = "\u2714";
        element.style.color = 'green';
     }
     else {
        let element = document.querySelector('#checkbox15');
        element.innerText = "\u2716";
        element.style.color = 'red';
     }    
}

function checkPassword() {
    const passWord = event.target.value;

    if(passWord.match(/\w{8,}/)) {
        let element = document.querySelector('#checkbox2');
        element.innerText = "\u2714";
        element.style.color = 'green';
     }
     else {
        let element = document.querySelector('#checkbox2');
        element.innerText = "\u2716";
        element.style.color = 'red';
     }   
}