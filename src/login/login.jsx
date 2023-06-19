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
    const [require3, setRequire3] = React.useState('\u2716');
    const [require4, setRequire4] = React.useState('\u2716');
    const [require5, setRequire5] = React.useState('\u2716');
    const [requires, setRequires] = React.useState(false);
    const [requires1, setRequires1] = React.useState(false);
    const [requires2, setRequires2] = React.useState(false);

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

    React.useEffect(() => {
        setRequires(requires1 && requires2);
    }, [requires1, requires2]);
    React.useEffect(() => {
        setRequires1(require1 === '\u2714' && require2 === '\u2714');
    }, [require1, require2]);
    React.useEffect(() => {
        setRequires2(require3 === '\u2714' && require4 === '\u2714' && require5 === '\u2714');
    }, [require3, require4, require5]);


    const submitForm = (hit = 'Enter') => {

        if(hit === 'Enter') {

            if(requires){

                console.log('you dunnit');

            } 
            else if(!requires1 && show) {

                setError('Please match the format for the username')
            
            } 
            else if(!requires2 && show) {
            
                setError('Please match the format for the password')
            
            } 
            else if(!requires && !show) {
            
                setError('Username/Password incorrect')
            
            }
        }
    }

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
                        <div style={{display: error === '' ? 'none' : 'block'}}id="error">
                            {error}
                        </div>
                        <div className="login"> 
                            <label htmlFor="text">Username:</label>
                            <input value={username} onChange={(e) => {const u = e.target.value; setUsername(u); setRequire1(u.length >= 5 ? '\u2714' : '\u2716'); setRequire2((u.length <= 15 && u.length !== 0) ? '\u2714' : '\u2716');}} onKeyDown={(e) => submitForm(e.key)} type="text" id="loginText" name="userName" placeholder="Enter your username" required pattern="\w{5,15}"/>
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
                            <input value={password} onChange={(e) => {const p = e.target.value; setPassword(p); setRequire3(p.length >= 8 ? '\u2714' : '\u2716'); setRequire4((/[A-Z]/).test(p) ? '\u2714' : '\u2716'); setRequire5((/[0-9]/).test(p) ? '\u2714' : '\u2716');}} onKeyDown={(e) => submitForm(e.key)} type="password" id="password" name="passWord" placeholder="Enter your password" required pattern="(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[\S]{8,}" />
                        </div>
                        <div style={{display: checkShow}} className="filler">
                            <div id="require2" className="require">
                                <div style={{color: require3 === '\u2714' ? 'green' : 'red'}} id="checkbox3" className="checkbox">{require3}</div>
                                <div id="passwordcheck"><b>Minimum</b> 8 characters</div>
                            </div>
                            <div id="require3" className="require">
                                <div style={{color: require4 === '\u2714' ? 'green' : 'red'}} id="checkbox4" className="checkbox">{require4}</div>
                                <div id="passwordcheck">An <b>uppercase</b> letter</div>
                            </div>
                            <div id="require4" className="require">
                                <div style={{color: require5 === '\u2714' ? 'green' : 'red'}} id="checkbox5" className="checkbox">{require5}</div>
                                <div id="passwordcheck">A <b>number</b></div>
                            </div>
                        </div>
                    </div>
                    <div className="login">
                    {/* onclick="submitForm('login')" */}
                        <button disabled={!(username && password && requires)} onClick={() => submitForm()} type="submit" id="submit" >Submit</button>      
                    </div>
                </div>
            </div>
        </main>
    );
}
