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
    // First we need to make the element that we are going to add to the DOM
    const newElement = document.createElement('div');

    // Next we find the feed field to add the post to
    const feed = document.querySelector('#feedfield');
 
    // Now we can add the right class to the element
    newElement.classList.add('post');

    // Now we can insert all of the different parts of it
        // Top matter
        const newTop = document.createElement('div');
        newTop.classList.add('topMatter');
            // User
            const user = document.createElement('p');
            user.textContent = post.user;
            user.classList.add('user');
            // Time Stamp
            const timeStamp = document.createElement('p');
            timeStamp.textContent = getTime(post.time);
            timeStamp.classList.add('timestamp');
        newTop.appendChild(user);
        newTop.appendChild(timeStamp);
        // Bottom Matter
        const newBottom = document.createElement('div');
        newBottom.classList.add('bottomMatter');
            // Title
            const title = document.createElement('b');
            title.textContent = post.title;
            title.classList.add('title');
            // Thoughts
            const thoughts = document.createElement('p');
            thoughts.textContent = post.content;
            thoughts.classList.add('thoughts');
        newBottom.appendChild(title);
        newBottom.appendChild(thoughts);

    // And finally we add that all to the post div
    newElement.appendChild(newTop);
    newElement.appendChild(newBottom);

    // And to finish we add that to the feed field
    feed.appendChild(newElement);
}

// This is a function just to take a post's time and change it into a string that we like
function getTime(time) {
    let bool = false;
    let value = '';
    let month = time.getMonth() + 1;
    value += month;
    value += '/';
    value += time.getDate();
    value += '/';
    value += time.getFullYear();
    value += ' ';
    let hour = time.getHours();
    if(hour > 12) {
        hour = hour - 12;
        value += hour;
        bool = true;
    }
    else {
        value += hour;
    }
    value += ':';
    value += time.getMinutes();
    value += ' ';
    if(bool) {
        value += 'pm';
    }
    else {
        value += 'am';
    }
    return value;
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

    // Pull the posts array out of storage to update it
    const store = JSON.parse(localStorage.getItem('posts'));

    // Let's make an object to hold all this info
    let obj = new Object;
    obj.title = title;
    obj.content = content;
    obj.user = localStorage.getItem('username');
    obj.time = new Date();
    obj.place = store.length + 1;

    // Maybe I'll put this in at a later date
    // obj.comments = [];

    // Now we can actually store the data
    store.unshift(obj);
    localStorage.setItem('posts', JSON.stringify(store));
    
}

function onLike() {

}
function offLike() {

}
