import React from 'react';
import "../../../style/Chats.scss";
import Message from "../../message";
function Chats() {
    return (
        <div className={"Chat"}>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            <Message/>
        </div>
    );
}

export default Chats;