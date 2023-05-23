// This loads the username into the corner of the page
window.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('username');
    if(user) {
        let elem = document.querySelector('#userInfo');
        elem.textContent = user;
        elem.style.fontSize = "15px";
        elem.style.height = 'auto';
    }
});

// This loads all the posts onto the page
window.addEventListener('DOMContentLoaded', () => {
    // Grab the data
    const store = JSON.parse(localStorage.getItem('posts'));

    // Go through each post and make it an html element
    for(const post of store) {
        rehydratePost(post);
    }
});

// This is the actual function that we will be using to puff up the posts
function rehydratePost(post) {
    // First we find the feed field to add the post to
    const feed = document.querySelector('#feedfield');
    
}

// This takes us back to the login page if we click on the username
function backToLogin() {
    localStorage.removeItem('username');
    window.location.replace('index.html');
};

// This allows us to add more posts to our local storage
function addPost() {
    // Let's get what we need from the form
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    // Let's make an object to hold all this info
    let obj = new Object;
    obj.title = title;
    obj.content = content;
    obj.user = localStorage.getItem('username');
    obj.time = new Date();
    // Maybe I'll put this in at a later date
    // obj.comments = [];

    // Pull the posts array out of storage to update it
    const store = JSON.parse(localStorage.getItem('posts'));
    store.unshift(obj);
    localStorage.setItem('posts', JSON.stringify(store));
    
}

function onLike() {

}
function offLike() {

}
