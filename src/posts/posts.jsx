import React from 'react';

import {NavLink} from 'react-router-dom';

import './posts.css';

export function Posts() {
    return (
        <main>
            <div id="topHeader">
                <NavLink id="bars" to='../likedPosts'>&#x2630;</NavLink>
                <h2 id="head">My Posts</h2>
                <div id="userInfo" onclick="backToLogin()">Login</div>
            </div>
            <div id="postsTable" class="table">
                <div id="headTable">
                    <div id="date" class="date">
                        Date
                    </div>
                    <div id="title" class="title">
                        Title
                    </div>
                    <div id="like" class="like">
                        Likes
                    </div>
                </div>
                <div id="posts"></div>
            </div>

        </main>
    );
}

// Do like you did in the Simon scores for here. This should be the easiest, followed by the feed and then the login and then the chats... :)