import React from 'react';

import {NavLink} from 'react-router-dom';

// import './feed.css';

export function FeedNoTop() {
    return (
        <main>
    <div id="topHeader">
        <NavLink id="bars" to="../feed">&#x2630;</NavLink>
        <h2>Feed</h2>
        {/* <div id="userInfo" onclick='backToLogin()'>Login</div> */}
    </div>
    <div id="feedAndQuote">
        <div id="feedfield"></div>
    </div>
        </main>
    );
}