import React from 'react';

export function Post(props) {

    const [like, setLike] = React.useState(props.liked);
    const [color, setColor] = React.useState(props.liked ? 'rgb(41, 195, 246)' : 'purple');

    React.useEffect(() => {
        setLike(props.liked);
    }, [props.liked]);

    React.useEffect(() => {
        if(like) {
            setColor('rgb(41, 195, 246)');
        }
        else if(!like) {
            setColor('purple')
        }
    }, [like]);

    async function hitLike(likeNum) {
        if(like) {
            await fetch(`/api/feed/${localStorage.getItem('username')}/dislike/${likeNum}`, {
                method: 'POST',
                headers: {'content-type': 'application:json'},
            });
        }
        else if(!like) {
            await fetch(`/api/feed/${localStorage.getItem('username')}/like/${likeNum}`, {
                method: 'POST',
                headers: {'content-type': 'application:json'},
            });
        }
        setLike(!like);
    }
    
    return (
        <div className="post">
            <div className="topMatter">
                <p className="user">{props.user}</p>
                <p className="timestamp">{props.date}<br/>{props.time}</p>
                <div className="buttons">
                    <button className="like" id={'like' + props.id} style={{backgroundColor: color}} onClick={() => {hitLike(props.id); props.handleClick(props.id);}}>Like</button>
                </div>
            </div>
            <div className="bottomMatter">
                <b className="title">{props.title}</b>
                <p className="thoughts">{props.content}</p>
            </div>
        </div>
    );
}
