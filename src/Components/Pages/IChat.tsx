import React, {useState} from 'react';
import "../../style/IChat.scss"
import Chats from "../moduls/IChat/Chats";
import LoginInfo from "../moduls/IChat/LoginInfo";
import Rooms from "../moduls/IChat/Rooms";
import Sender from "../moduls/IChat/Sender";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import chats from "../types/chats";
import Store from "../types/Store";


function IChat() {
    const history = useHistory();
    const store: Store = useSelector((state: Store) => state)
    const [message, setMessage] = useState<chats>({
        id: 0,
        login: store.login,
        message: "",
        date: ""
    })
    if (store.id === 0) {
        history.push("/");
    }


    return (
        <div className={"IChat"}>
            <div className="IChat_left">
                <LoginInfo name={store.name} surname={store.surname}/>
                <Rooms login={store.login}/>
            </div>
            <div className="IChat_right">
                <Chats message={message}/>
                <Sender onClick={(value) => {
                    setMessage({
                        id: 0,
                        login: store.login,
                        message: value,
                        date: ""
                    })
                }}/>
            </div>
        </div>
    );
}

export default IChat;