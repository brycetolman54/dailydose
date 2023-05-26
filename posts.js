window.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('username');
    if(user) {
        let elem = document.querySelector('#userInfo');
        elem.textContent = user;
        elem.style.fontSize = "15px";
        elem.style.height = 'auto';
    }
});

function backToLogin() {
    localStorage.removeItem('username');
    window.location.replace('index.html');
};

function closeOtherPosts(buttonId) {
    // Get the posts element
    const posts = document.getElementById('posts');
    console.log(posts);

    // Get its children
    const children = posts.children;
    console.log(children);

    // Go through the children. If the buttonId doesn't match, change its checked attribute to false
    for(const child in children) {
        console.log(child[0].checked);
    }
}