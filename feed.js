// This loads the username into the corner of the page
window.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('username');
    if(user) {
        let elem = document.querySelector('#userInfo');
        elem.textContent = user;
        elem.style.fontSize = "15px";
        elem.style.height = 'auto';
    }
    else {
        window.location.replace('index.html');
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
                // Date
                const date = document.createTextNode(`${getDate(new Date(post.time))}`);
                //timeStamp.textContent = getDate(new Date(post.time));
                // Break
                const lineBreak = document.createElement('br');
                // Time
                const time = document.createTextNode(`${getTime(new Date(post.time))}`);
            timeStamp.appendChild(date);
            timeStamp.appendChild(lineBreak);
            timeStamp.appendChild(time);
            timeStamp.classList.add('timestamp');
            // Buttons
            const buttons = document.createElement('div');
            buttons.classList.add('buttons');
        newTop.appendChild(user);
        newTop.appendChild(timeStamp);
        newTop.appendChild(buttons);
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

// This is to get the post's date and change it into a string
function getDate(time) {
    let value = '';
    let month = time.getMonth() + 1;
    value += month;
    value += '/';
    value += time.getDate();
    value += '/';
    value += time.getFullYear();
    return value;
}

// This is a function just to take a post's time and change it into a string that we like
function getTime(time) {
    let bool = false;
    let value = '';
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
    if(time.getMinutes() < 10) {
        value += 0;
    }
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
    let store = JSON.parse(localStorage.getItem('posts'));
    if(!store) {
        localStorage.setItem('posts', JSON.stringify([]));
        store = JSON.parse(localStorage.getItem('posts'));
    }

    // Let's make an object to hold all this info
    let obj = new Object;
    obj.title = title;
    obj.content = content;
    obj.user = localStorage.getItem('username');
    obj.time = new Date();
    obj.place = store.length;

    // Maybe I'll put this in at a later date
    // obj.comments = [];

    // Now we can actually store the data
    store.unshift(obj);
    localStorage.setItem('posts', JSON.stringify(store));
    
}

function enablePost() {
    if(document.getElementById('postTitle').value.length > 0 && document.getElementById('postContent').value.length > 0) {
        document.getElementById('postIt').disabled = false;
    }
    else {
        document.getElementById('postIt').disabled = true;
    }
}

// Turns a like on
function onLike(likeNum) {
    // Like num tells me which post to change the like button on and which to add and such
    // When making the like button in rehydrate post, just add the num of the post to the onclick function
    // Changes like button color
    // Add this like (the post's number) to the likes array of the root user
    // Change the onclick function of this like button (like#) to be offLike
    // I would need to add code in the rehydrate post to see if the like button needs to be colored (check the post num against the array of likes of the root user with the includes fucntion maybe)
}
// Turns a like off
function offLike() {
    // Undo all of what onlike does
}

// A function to fill out the inspiration quote part of the page
function getQuote() {
    // Do this... :)
}