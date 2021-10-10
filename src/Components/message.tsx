import React from 'react';
import "../style/Messages.scss"

interface IMessage{
    className:"left"|"right",
}

function Message(props:IMessage) {
    return (
        <div className={`Message ${props.className}`}>
            <div className={`Message_nickName--${props.className}`}>Thunder:</div>
            <span >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, aliquam deleniti dicta doloribus earum excepturi obcaecati qui sed vero voluptatibus! Ab dolor ducimus laborum molestiae odit recusandae rem repellat voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus accusantium culpa dolore eos expedita facere fugiat id ipsa, optio placeat qui repellendus sit? Ad aspernatur assumenda dolorem harum quis. </span>
        </div>
    );
}

export default Message;