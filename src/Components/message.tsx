import React from 'react';
import "../style/Messages.scss"

interface IMessage {
    message: string,
    login: string,
    currentUser: string
}

function Message(props: IMessage) {
    const className = props.currentUser === props.login
        ? "right"
        : "left"
    return (
        <div className={`Message ${className}`}>
            <div className={`Message_nickName--${className}`}>{props.login}
            </div>
            <span>{props.message}</span>
        </div>
    );
}

export default Message;