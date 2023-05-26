window.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('username');
    if(user) {
        let elem = document.querySelector('#userInfo');
        elem.textContent = user;
        elem.style.fontSize = "15px";
        elem.style.height = 'auto';
    }
    fillTable();
});

function backToLogin() {
    localStorage.removeItem('username');
    window.location.replace('index.html');
};

function getRootUser() {
    // Get the username
    const username = localStorage.getItem('username');
    // Get the array of the user objects
    const userData = JSON.parse(localStorage.getItem('userData'));
    // Find the username in the list of userData and return that object

    return userData.find(obj => obj.name === username);
}

// When we click on one post, we close all the others
function closeOtherPosts(buttonId) {

    // Get the length of the posts array from the root user
    const rootUser = getRootUser();
    const length = rootUser.posts.length;

    // Now we loop
    for(let i = 0; i < length; i++) {

        // Get the input element with the reveali id
        let reveal = document.getElementById(`reveal${i}`);
        
        // Then, if the button is not the one we are clicking, close it
        if(i !== buttonId) {
            reveal.checked = false;
        }
    }


    // Get the posts element
    // const posts = document.getElementById('posts');
    // console.log(posts);

    // // Get its children
    // const children = posts.childNodes;
    // console.log(children);

    // // Go through the children. If the buttonId doesn't match, change its checked attribute to false
    // for(const child in children) {
    //     console.log(child[0]);
    // }
}

// This function fills in the table with our posts
function fillTable() {

}