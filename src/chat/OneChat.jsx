import React from 'react';

export function OneChat(props) {

    const [active, setActive] = React.useState(false);
    const [color, setColor] = React.useState({color: 'green', back: 'green'});

    const [unSeen, setUnSeen] = React.useState(props.unseen);
    const [bkgColor, setBkgColor] = React.useState('white');

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setUnSeen(props.unseen);
    }, [props.unseen]);

    React.useEffect(() => {
        setOpen(props.open === props.with);
    }, [props.open]);
    
    React.useEffect(() => {
        if(open) {
            setBkgColor('lightblue');
        }
        else if(!open) {
            setBkgColor('white');
        }
    }, [open]);

    React.useEffect(() => {
        if(unSeen) {
            setBkgColor('rgb(226, 226, 251)');
        }
        else if(!unSeen) {
            setBkgColor('white');
        }
    }, [unSeen]);

    React.useEffect(() => {
        if(active) {
            setColor({color: 'green', back: 'green'});
        }
        else if(!active) {
            setColor({color: 'grey' , back: 'rgb(234, 233, 233)'})
        }
    }, [active]);

    return (
        <li className="chatGroup" id={props.with} style={{backgroundColor: bkgColor}} onClick={props.setChat}>
            <div className="chatuser">{props.with}</div>
            <p className="date">{props.time}</p>
            <div className="littleDot" style={{bordercolor: color.color, backgroundColor: color.back}}></div>
        </li>
    )
}