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
