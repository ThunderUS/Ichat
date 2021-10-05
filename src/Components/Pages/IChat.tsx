import React from 'react';
import "../../style/IChat.scss"
import Rooms from "../moduls/IChat/Rooms";

function IChat() {
    return (
        <div className={"IChat"}>
            <Rooms/>
        </div>
    );
}

export default IChat;