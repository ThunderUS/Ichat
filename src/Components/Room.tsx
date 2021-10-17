import React from 'react';
import "../style/Room.scss"

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

    function getUserName(roomInfo: TRoomInfo, userLogin: string) {
        return roomInfo.users
            .split("/")
            .filter(el => el !== userLogin)
            .join("");
    }

    return (
        <div className={"Room"}>
            <span>{getUserName(roomInfo, currentUserNickname)}</span>
        </div>
    );
}

export default Room;