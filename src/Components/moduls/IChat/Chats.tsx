import React, {useEffect, useState} from 'react';
import "../../../style/Chats.scss";
import Message from "../../message";

//import {useSelector} from "react-redux";

type TChats = {
    roomID?: number
}

function Chats(props: TChats) {
    const [chats, setChats] = useState<any>([])
    useEffect(() => {

    }, []);
    return (
        <div className={"Chat"}>
            {
                props.roomID === 0 || props.roomID === undefined
                    ? <div className={"empty_room"}>Click on user name to open room. </div>
                    : <div className={"Chat_wrapper"}>
                        <Message className={"left"}/>
                        <Message className={"right"}/>
                        <Message className={"left"}/>
                        <Message className={"right"}/>
                        <Message className={"left"}/>
                        <Message className={"right"}/>
                    </div>
            }
        </div>
    );
}

export default Chats;