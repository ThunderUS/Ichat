import React, {useEffect, useState} from 'react';
import "../../../style/Chats.scss";
import Message from "../../message";
import {useSelector} from "react-redux";
import Store from "../../types/Store";
import axios from "axios";
import resChats from "../../types/chats";
import HOST from "../../../confige/config";
import chats from "../../types/chats";

type TProps = {
    message: chats,
}

function Chats(props: TProps) {
    const [chats, setChats] = useState<resChats[]>([]);
    const store: Store = useSelector((store: Store) => store);

    useEffect(() => {
        setChats([]);
        if (store.roomID !== 0 && store.roomID !== undefined) {
            axios.post(HOST + "/chats", {
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
    useEffect(() => {
        if (props.message.message !== "" || props.message.message !== undefined) {
            setChats((prevState) => {
                return [...prevState, props.message];
            })
        }
    }, [props.message])
    return (
        <div className={"Chat"}>
            {
                store.roomID === 0 || store.roomID === undefined
                    ? <div className={"empty_room"}>Click on user name to open room. </div>
                    : <div className={"Chat_wrapper"}>
                        {
                            chats.map((el) => {
                                return <Message key={el.id + el.message + Math.random() * 353} message={el.message}
                                                login={el.login}
                                                currentUser={store.login}/>;
                            })
                        }
                    </div>
            }
        </div>
    );
}

export default Chats;