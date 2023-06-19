import React from 'react';

import './login.css';

export function Login() {

    const [show, setShow] = React.useState(false);
    const [checkShow, setCheckShow] = React.useState('none');
    const [loginBorder, setLoginBorder] = React.useState('2px');
    const [suBorder, setSuBorder] = React.useState('0.5px');

    React.useEffect(() => {
        if(show) {
            setLoginBorder('0.5px');
            setSuBorder('2px');
            setCheckShow('flex');
        }
        else if(!show) {
            setLoginBorder('2px');
            setSuBorder('0.5px');
            setCheckShow('none');
        }
    }, [show]);

    return (
        <main>
            <h2 id="mainHeader">Login</h2>
            <div> 
                <div className="login" id="topbuttons">
                    <button style={{borderWidth: loginBorder}} type="Login" id="login" onClick={() => setShow(false)}>Login</button>
                    <button style={{borderWidth: suBorder}} type="SignUp" id="signup" onClick={() => setShow(true)}>Sign Up</button>
                </div>
                <div id="loginForm">
                    <div id="loginbox">
                        <div id="error">
                            {/* <!-- Inserted by code --> */}
                        </div>
                        <div className="login"> 
                            <label htmlFor="text">Username:</label>
                            {/* oninput="checkUsername()" onkeydown="checkEnter(event, 'login')" */}
                            <input type="text" id="loginText" name="userName" placeholder="Enter your username" required pattern="\w{5,15}"/>
                        </div>
                        <div style={{display: checkShow}} className="filler">
                            <div id="require1" className="require">
                                <div id="checkbox1" className="checkbox">&#x2716;</div>
                                <div id="usernamecheck"><b>Minimum</b> 5 characters</div>
                            </div>
                            <div id="require1.5" className="require">
                                <div id="checkbox2" className="checkbox">&#x2716;</div>
                                <div id="usernamecheck"><b>Maximum</b> 15 characters</div>
                            </div>
                        </div>
                        <div className="login">
                            <label htmlFor="password">Password:</label>
                            {/* oninput="checkPassword()" onkeydown="checkEnter(event, 'login')" */}
                            <input type="password" id="password" name="passWord" placeholder="Enter your password" required pattern="(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[\S]{8,}" />
                        </div>
                        <div style={{display: checkShow}} className="filler">
                            <div id="require2" className="require">
                                <div id="checkbox3" className="checkbox">&#x2716;</div>
                                <div id="passwordcheck"><b>Minimum</b> 8 characters</div>
                            </div>
                            <div id="require3" className="require">
                                <div id="checkbox4" className="checkbox">&#x2716;</div>
                                <div id="passwordcheck">An <b>uppercase</b> letter</div>
                            </div>
                            <div id="require4" className="require">
                                <div id="checkbox5" className="checkbox">&#x2716;</div>
                                <div id="passwordcheck">A <b>number</b></div>
                            </div>
                        </div>
                    </div>
                    <div className="login">
                    {/* onclick="submitForm('login')" */}
                        <button type="submit" id="submit" >Submit</button>      
                    </div>
                </div>
            </div>
        </main>
    );
}
