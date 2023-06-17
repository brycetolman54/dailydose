import React from 'react';

import {getDate, getTime} from '../feed/feed';

export function Message(props) {
    return(
        <li className="wholeMessage" id={props.whose + 'Message'}>
            <p className="message" id={props.whose}>{props.msg}</p>
            <p className="time" id={props.whose + 'Time'}>{getDate(new Date(props.time))} {getTime(new Date(props.time))}</p>
        </li>
    )
}