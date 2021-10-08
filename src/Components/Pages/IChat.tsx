import React from 'react';
import "../../style/IChat.scss"
import Sender from "../moduls/IChat/Sender";

function IChat() {
    return (
        <div className={"IChat"}>
            <Sender/>
        </div>
    );
}

export default IChat;