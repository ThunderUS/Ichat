import React from 'react';
import "../../../style/Room.scss"
import {useDispatch} from "react-redux";

type TRoomInfo = {
    id: number,
    users: string
}

interface IRoom {
    roomInfo: TRoomInfo,
    currentUserNickname: string
}

function Room(props: IRoom) {
    const {roomInfo, currentUserNickname} = props;
    const dispatch = useDispatch();

    function getUserName(roomInfo: TRoomInfo, userLogin: string) {
        return roomInfo.users
            .split("/")
            .filter(el => el !== userLogin)
            .join("");
    }

    return (
        <div onClick={() => {
            dispatch({
                type: "ROOM_ID", payload: {
                    roomID: roomInfo.id,
                }
            })
        }} className={"Room"}>
            <span>{getUserName(roomInfo, currentUserNickname)}</span>
        </div>
    );
}

export default Room;