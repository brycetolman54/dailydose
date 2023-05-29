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
function fillTable() {
    // Get the root user
    const rootUser = getRootUser();

    // Get the posts array from the root user
    const posts = rootUser.posts;

    // Get the parent div element of posts
    const parent = document.getElementById('posts');

    // Get all of the posts from the feed page
    const allPosts = JSON.parse(localStorage.getItem('posts'));

    // Add each post to the table
    for(const post of posts) {
        const newPost = addPost(post, allPosts);
        parent.appendChild(newPost);
    }

}

// This actually adds the post to the table
function addPost(post, allPosts) {

    // Grab the post itself
    const thisPost = allPosts[allPlace.length - post.allPlace];

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
                label.setAttribute('for',`reveal${post.myPlace}`);
                // Add the class
                label.classList.add('label');
                // Add event listener
                label.addEventListener('click', `closeOtherPosts(${post.myPlace})`);

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

                            // Add the likes
                            const like = document.createElement('div');
                                // Add the id
                                like.setAttribute('id',`like${post.myPlace}`);
                                // Add the class
                                like.classList.add('like');
                                // Set the content
                                like.textContent = thisPost.likes;
                            // Put that in the head div
                            headDiv.appendChild(like);
                    
                    // Add that head to the liEl
                    liEl.appendChild(headDiv);

                    // Add the content div
                    const content = document.createElement('div');
                        // Add the class
                        content.classList.add('content');
                        // Add the id
                        content.setAttribute('id', `content${post.myPlace}`);
                        // Set the content
                        content.textContent = thisPost.content;
                    liEl.appendChild(content);

    return liEl;
}