import React from 'react';

import './login.css';

export function Login() {
    return (
        <main>
            <h2 id="mainHeader">Login</h2>
            <div> 
                <div class="login" id="topbuttons">
                    <button type="Login" id="login" onclick="switchForm('login')">Login</button>
                    <button type="SignUp" id="signup" onclick="switchForm('signup')">Sign Up</button>
                </div>
                <div id="loginForm">
                    <div id="loginbox">
                        <div id="error">
                            {/* <!-- Inserted by code --> */}
                        </div>
                        <div class="login"> 
                            <label for="text">Username:</label>
                            <input type="text" id="loginText" name="userName" placeholder="Enter your username" required pattern="\w{5,15}" oninput="checkUsername()" onkeydown="checkEnter(event, 'login')"/>
                        </div>
                        <div class="filler">
                            <div id="require1" class="require">
                                <div id="checkbox1" class="checkbox">&#x2716</div>
                                <div id="usernamecheck"><b>Minimum</b> 5 characters</div>
                            </div>
                            <div id="require1.5" class="require">
                                <div id="checkbox2" class="checkbox">&#x2716</div>
                                <div id="usernamecheck"><b>Maximum</b> 15 characters</div>
                            </div>
                        </div>
                        <div class="login">
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="passWord" placeholder="Enter your password" required pattern="(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[\S]{8,}" oninput="checkPassword()" onkeydown="checkEnter(event, 'login')"/>
                        </div>
                        <div class="filler">
                            <div id="require2" class="require">
                                <div id="checkbox3" class="checkbox">&#x2716</div>
                                <div id="passwordcheck"><b>Minimum</b> 8 characters</div>
                            </div>
                            <div id="require3" class="require">
                                <div id="checkbox4" class="checkbox">&#x2716</div>
                                <div id="passwordcheck">An <b>uppercase</b> letter</div>
                            </div>
                            <div id="require4" class="require">
                                <div id="checkbox5" class="checkbox">&#x2716</div>
                                <div id="passwordcheck">A <b>number</b></div>
                            </div>
                        </div>
                    </div>
                    <div class="login">
                        <button type="submit" id="submit" onclick="submitForm('login')">Submit</button>      
                    </div>
                </div>
            </div>
        </main>
    );
}
