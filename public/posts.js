window.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('username');
    if(user) {
        let elem = document.querySelector('#userInfo');
        elem.textContent = user;
        elem.style.fontSize = "15px";
        elem.style.height = 'auto';
    }
    loadPage();
});

async function loadPage() {
    const length = await fillMyTable();
    fillLikeTable(length);
}

function backToLogin() {
    localStorage.removeItem('username');
    window.location.replace('index.html');
};

// function getRootUser() {
//     // Get the username
//     const username = localStorage.getItem('username');
//     // Get the array of the user objects
//     const userData = JSON.parse(localStorage.getItem('userData'));
//     // Find the username in the list of userData and return that object

//     return userData.find(obj => obj.name === username);
// }

// When we click on one post, we close all the others
async function closeOtherPosts(buttonId = -1) {

    // First we want to make it show
    if(buttonId !== -1) {
        const content = document.getElementById(`content${buttonId}`);
        content.style.display = 'flex';
    }

    // Get the length of the posts array from the root user
    // const rootUser = getRootUser();
    // const length = rootUser.posts.length + rootUser.likes.length;
    const result0 = await fetch(`/api/posts/mine/${localStorage.getItem('username')}`);
    const length0 = await result0.json().length;
    const result1 = await fetch(`/api/posts/liked/${localStorage.getItem('username')}`);
    const length1 = await result1.json().length;
    const length = length0 + length1;

    // Now we loop
    for(let i = 0; i < length; i++) {

        // Set like
        const like = i > rootUser.posts.length;

        // Get the input element with the reveali id
        let reveal = document.getElementById(`reveal${i}`);

        // Then, if the button is not the one we are clicking, close it
        if(i !== buttonId) {
            reveal.checked = false;
        }
    }
    if(buttonId === -1) {
        for(let i = 0; i < length; i++) {

            // Get the input element with the contenti id
            let contents = document.getElementById(`content${i}`);
            
            contents.style.display = 'none';
        }
    }
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

// This function fills in the table with our posts
async function fillMyTable() {
    // Get the root user
    // const rootUser = getRootUser();

    // Get the posts array from the root user
    // const posts = rootUser.posts.sort((a,b) => b.allPlace - a.allPlace);
    const result0 = await fetch(`/api/posts/mine/${localStorage.getItem('username')}`);
    const almost = await result0.json();
    const posts = almost.sort((a,b) => b.allPlace - a.allPlace);
    const length = posts.length;

    // Get the parent div element of posts
    const parent = document.getElementById('posts');

    // Get all of the posts from the feed page
    // const allPosts = JSON.parse(localStorage.getItem('posts'));
    const result1 = await fetch('/api/posts/posts');
    const allPosts = await result1.json();
    // Set it in local for later use
    localStorage.setItem('allPosts', JSON.stringify(allPosts));

    // Add each post to the table
    for(const post of posts) {
        const newPost = addPost(post, allPosts);
        parent.appendChild(newPost);
    }

    return Number(length);
}

// This actually adds the post to the table
function addPost(post, allPosts, place = -1) {

    // If this is a like post
    if(typeof(post) === 'number') {
        let num = post;
        post = new Object();
        post.myPlace = num;
        post.allPlace = place;
    }

    // Grab the post itself
    const thisPost = allPosts[allPosts.length - post.allPlace - 1];
    // console.log(thisPost, allPosts, allPosts.length, post.allPlace);

    // Make an li element to add the post to
    const liEl = document.createElement('li');
        // Add the class
        liEl.classList.add('post');
        // Add the id
        liEl.setAttribute('id', `post${post.myPlace}`);
        
            // Add the checkbox
            const check = document.createElement('input');
                // Add the type
                check.setAttribute('type', 'checkbox');
                // Add the class
                check.classList.add('reveal');

                // Add the id
                check.setAttribute('id', `reveal${post.myPlace}`);

            // Put it in the liEl
            liEl.appendChild(check);
            
            // Add the label
            const label = document.createElement('label');
                // Add the id
                label.setAttribute('id',`label${post.myPlace}`);
                // Add the for
                label.setAttribute('for', `reveal${post.myPlace}`);
                // Add the class
                label.classList.add('label');
                // Add event listener
                label.setAttribute('onclick', `closeOtherPosts(${post.myPlace})`);

                    // Add the head div
                    const headDiv = document.createElement('div');
                        // Add the id
                        headDiv.setAttribute('id',`head${post.myPlace}`);
                        // Add the class
                        headDiv.classList.add('head');

                            // Add the date
                            const date = document.createElement('div');
                                // Add the id
                                date.setAttribute('id',`date${post.myPlace}`);
                                // Add the class
                                date.classList.add('date');
                                // Set the content
                                date.textContent = getDate(new Date(thisPost.time));
                            // Put that in the head div
                            headDiv.appendChild(date);

                            // Add the title
                            const title = document.createElement('div');
                                // Add the id
                                title.setAttribute('id',`title${post.myPlace}`);
                                // Add the class
                                title.classList.add('title');
                                // Set the content
                                title.textContent = thisPost.title;
                            // Put that in the head div
                            headDiv.appendChild(title);

                            // If it is my page
                            if(place === -1) {
                                // Add the likes
                                const like = document.createElement('div');
                                    // Add the id
                                    like.setAttribute('id',`like${post.myPlace}`);
                                    // Add the class
                                    like.classList.add('like');
                                    // Set the content
                                    like.textContent = `${thisPost.likes}`;
                                // Put that in the head div
                                headDiv.appendChild(like);
                            }
                    
                    // Add that head to the liEl
                    label.appendChild(headDiv);

                    // Add the content div
                    const content = document.createElement('div');
                        // Add the class
                        content.classList.add('content');
                        // Add the id
                        content.setAttribute('id', `content${post.myPlace}`);
                        // Set the content
                        content.textContent = thisPost.content;
                    label.appendChild(content);

            // Add the label to the liEl
            liEl.appendChild(label);
    return liEl;
}

async function fillLikeTable(begin) {
    // Get the root user
    // const rootUser = getRootUser();
    // const begin = rootUser.posts.length;
    

    // Get the posts array from the root user
    // let posts = rootUser.likes;
    // posts = posts.sort((a,b) => b - a);
    const result = await fetch(`/api/posts/liked/${localStorage.getItem('username')}`);
    const almost = await result.json();
    const posts = almost.sort((a,b) => (b - a));

    // Get the parent div element of posts
    const parent = document.getElementById('likePosts');

    // Get all of the posts from the feed page
    // const allPosts = JSON.parse(localStorage.getItem('posts'));
    const allPosts = JSON.parse(localStorage.getItem('allPosts'));

    // Add each post to the table
    let i = 0;
    for(const post of posts) {
        const newPost = addPost(begin + i, allPosts, post);
        parent.appendChild(newPost);
        i++;
    }
}

function changePosts(which) {
    if(which === 'like') {
        // Change the header
        const head = document.getElementById('head');
        head.textContent = 'Liked Posts';

        // Change the function
        const bar = document.getElementById('bars');
        bar.setAttribute('onclick', "changePosts('mine')");

        // Get the tables to change display
        const mine = document.getElementById('postsTable');
        mine.style.display = 'none';

        const like = document.getElementById('likeTable');
        like.style.display = 'flex';
    }
    else if(which === 'mine') {
        // Change the header
        const head = document.getElementById('head');
        head.textContent = 'My Posts';

        // Change the function
        const bar = document.getElementById('bars');
        bar.setAttribute('onclick', "changePosts('like')");

        // Get the tables to change display
        const mine = document.getElementById('postsTable');
        mine.style.display = 'flex';

        const like = document.getElementById('likeTable');
        like.style.display = 'none';
    }

    // Then make sure all are closed
    closeOtherPosts();
}