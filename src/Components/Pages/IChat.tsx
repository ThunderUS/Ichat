import React from 'react';
import "../../style/IChat.scss"
import Chats from "../moduls/IChat/Chats";
import LoginInfo from "../moduls/IChat/LoginInfo";
import Rooms from "../moduls/IChat/Rooms";
import Sender from "../moduls/IChat/Sender";


function IChat() {
    return (
        <div className={"IChat"}>
            <div className="IChat_left">
                <LoginInfo/>
                <Rooms/>
            </div>
            <div className="IChat_right">
                <Chats/>
                <Sender/>
            </div>
        </div>
    );
}

export default IChat;