import React, {useEffect, useState} from 'react';
import "../../../style/Chats.scss";
import Message from "../../message";
import {useSelector} from "react-redux";
import Store from "../../types/Store";
import axios from "axios";
import resChats from "../../types/chats";


function Chats() {
    const [chats, setChats] = useState<resChats[]>([]);
    const store: Store = useSelector((store: Store) => store);

    useEffect(() => {
        setChats([]);
        if (store.roomID !== 0 && store.roomID !== undefined) {
            axios.post("http://localhost:8080/chats", {
                select: `SELECT *
                         FROM chats_${store.roomID}`
            }).then(response => {

                if (response.data.name !== undefined) {
                    return;
                } else {
                    response.data.map((el: resChats) => {
                        setChats((prev) => {
                            return [...prev, el];
                        });
                        return null;
                    })
                }
            })
        }
    }, [store.roomID]);
    return (
        <div className={"Chat"}>
            {
                store.roomID === 0 || store.roomID === undefined
                    ? <div className={"empty_room"}>Click on user name to open room. </div>
                    : <div className={"Chat_wrapper"}>
                        {
                            chats.map((el) => {
                                return <Message key={el.id} message={el.message} login={el.login}
                                                currentUser={store.login}/>;
                            })
                        }
                    </div>
            }
        </div>
    );
}

export default Chats;