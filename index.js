function switchForm(toWhat) {
    if(toWhat === "login") {
        document.querySelector('login');
        insertRule("#filler {display: none;}");
    }
    if(toWhat === "signup") {

        insertRule("#filler {display: grid;}")
    }
};
