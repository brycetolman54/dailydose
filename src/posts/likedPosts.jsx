import React from 'react';

import {NavLink} from 'react-router-dom';

import './posts.css';

export function LikedPosts() {
    return (
        <main>
            <div id="topHeader">
                <NavLink id="bars" to='../posts'>&#x2630;</NavLink>
                <h2 id="head">Liked Posts</h2>
                {/* <div id="userInfo" onclick="backToLogin()">Login</div> */}
            </div>

            <div id="likeTable" className="table">
                <div id="headTable">
                    <div id="date" className="date">
                        Date
                    </div>
                    <div id="title" className="title">
                        Title
                    </div>
                </div>
                <div id="likePosts"></div>
            </div>
        </main>
    );
}