import React from 'react';

import './login.css';

export function Login() {

    const [show, setShow] = React.useState(false);
    const [checkShow, setCheckShow] = React.useState('none');
    const [loginBorder, setLoginBorder] = React.useState('2px');
    const [suBorder, setSuBorder] = React.useState('0.5px');

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [error, setError] = React.useState('');

    const [require1, setRequire1] = React.useState('\u2716');
    const [require2, setRequire2] = React.useState('\u2716');

    React.useEffect(() => {

        setUsername('');
        setPassword('');

        if(show) {
            setLoginBorder('0.5px');
            setSuBorder('2px');
            setCheckShow('flex');
            setError('');
        }
        else if(!show) {
            setLoginBorder('2px');
            setSuBorder('0.5px');
            setCheckShow('none');
            setError('');
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
                            {error}
                        </div>
                        <div className="login"> 
                            <label htmlFor="text">Username:</label>
                            {/* oninput="checkUsername()" onkeydown="checkEnter(event, 'login')" */}
                            <input value={username} onChange={(e) => {setUsername(e.target.value); setRequire1(e.target.value.length >= 5 ? '\u2714' : '\u2716'); setRequire2((e.target.value.length <= 15 && e.target.value.length !== 0) ? '\u2714' : '\u2716');}} type="text" id="loginText" name="userName" placeholder="Enter your username" required pattern="\w{5,15}"/>
                        </div>
                        <div style={{display: checkShow}} className="filler">
                            <div id="require1" className="require">
                                <div style={{color: require1 === '\u2714' ? 'green' : 'red'}} id="checkbox1" className="checkbox">{require1}</div>
                                <div id="usernamecheck"><b>Minimum</b> 5 characters</div>
                            </div>
                            <div id="require1.5" className="require">
                                <div style={{color: require2 === '\u2714' ? 'green' : 'red'}} id="checkbox2" className="checkbox">{require2}</div>
                                <div id="usernamecheck"><b>Maximum</b> 15 characters</div>
                            </div>
                        </div>
                        <div className="login">
                            <label htmlFor="password">Password:</label>
                            {/* oninput="checkPassword()" onkeydown="checkEnter(event, 'login')" */}
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="passWord" placeholder="Enter your password" required pattern="(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[\S]{8,}" />
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
                        <button disabled={!(username && password)} type="submit" id="submit" >Submit</button>      
                    </div>
                </div>
            </div>
        </main>
    );
}
