import React from 'react';

export function OneChat(props) {

    const [active, setActive] = React.useState('true');
    const [color, setColor] = React.useState({color: 'green', back: 'green'});

    React.useEffect(() => {
        if(active) {
            setColor({color: 'green', back: 'green'});
        }
        else if(!active) {
            setColor({color: 'grey' , back: 'rgb(234, 233, 233)'})
        }
    }, [active]);

    return (
        <li className="chatGroup" id={props.with} >
            <div className="chatuser">{props.with}</div>
            <p className="date">{props.time}</p>
            <div className="littleDot" style={{bordercolor: color.color, backgroundColor: color.back}}></div>
        </li>
    )
}