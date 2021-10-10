import React from 'react';
import "../../../style/Chats.scss";
import Message from "../../message";
function Chats() {
    return (
        <div className={"Chat"}>
            <Message className={"left"}/>
            <Message className={"right"}/>
            <Message className={"left"}/>
            <Message className={"right"}/>
            <Message className={"left"}/>
            <Message className={"right"}/>
        </div>
    );
}

export default Chats;