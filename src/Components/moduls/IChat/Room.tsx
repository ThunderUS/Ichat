import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import "../../../style/Room.scss"
import {useDispatch} from "react-redux";
import socket from "../../../confige/Socket";
import axios from "axios";
import HOST from "../../../confige/config";
import noAvatar from "../../../images/NoAvatar.jpg";

type TRoomInfo = {
    id: number,
    users: string
}

interface IRoom {
    roomInfo: TRoomInfo,
    currentUserNickname: string,
    newMessage: boolean,
    setNewMessage: Dispatch<SetStateAction<number[]>>
}

function Room(props: IRoom) {
    const {roomInfo, currentUserNickname} = props;
    const dispatch = useDispatch();
    const [isOnLine, setIsOnline] = useState<boolean>(false);
    const userRoom = getUserName(roomInfo, currentUserNickname);

    useEffect(() => {
        axios.get(HOST + "/users/online").then(data => {
            data.data.forEach((e: string) => {
                if (e === userRoom) {
                    setIsOnline(true);
                }
            })
        })
    }, [userRoom])

    socket.on("new-online", (login) => {
        if (getUserName(roomInfo, currentUserNickname) === login) {
            setIsOnline(true);
        }
    })

    socket.on("disconnect-user", (login) => {
        if (getUserName(roomInfo, currentUserNickname) === login) {
            setIsOnline(false);
        }
    })

    function getUserName(roomInfo: TRoomInfo, userLogin: string) {
        return roomInfo.users
            .split("/")
            .filter(el => el !== userLogin)
            .join("");
    }

    const avatar = `${HOST}/${getUserName(roomInfo, currentUserNickname)}.jpg`;
    return (
        <div onClick={() => {
            dispatch({
                type: "ROOM_ID", payload: {
                    roomID: roomInfo.id,
                }

            })
            props.setNewMessage(prevState => {
                return [...prevState.filter((el) => {
                    return el !== roomInfo.id;
                })]
            })
        }}
             className={"Room"}>
            <img src={avatar} onError={(e) => {
                console.log(e)
                e.currentTarget.src = noAvatar;
            }} alt={"Avatar"} className={"Avatar"}/>
            {isOnLine ? <div className={"Room_online"}/> : null}
            <span> {getUserName(roomInfo, currentUserNickname)}</span>
            {props.newMessage && <div className={"Room_new"}/>}

        </div>
    );
}

export default Room;