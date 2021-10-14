import React from 'react';
import "../../style/IChat.scss"
import Chats from "../moduls/IChat/Chats";
import LoginInfo from "../moduls/IChat/LoginInfo";
import Rooms from "../moduls/IChat/Rooms";
import Sender from "../moduls/IChat/Sender";
import { useSelector} from "react-redux";
import {useHistory} from "react-router-dom";


function IChat() {
    const history=useHistory();
    const store:any=useSelector(state=>state)
    if (store.id===0){
        history.push("/");
    }
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