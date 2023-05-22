function switchForm(toWhat) {
    if(toWhat === "login") {

        let filler = document.querySelectorAll('.filler');
        for(let fill of filler) {
            fill.style.display = 'none';
        }
    }
    if(toWhat === "signup") {
        
        let filler = document.querySelectorAll('.filler');
        for(let fill of filler) {
            fill.style.display = 'grid';
        }
    }
};
