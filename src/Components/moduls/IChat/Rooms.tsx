import React, {useEffect, useState} from 'react';
import "../../../style/Rooms.scss"
import axios from "axios";
import Room from "./Room";
import HOST from "../../../confige/config";


interface IRooms {
    login: string,
    update: boolean,
}

type TArrayRoomsUser = {
    id: number,
    users: string
}

function Rooms(props: IRooms) {
    const [arrayRoomsUser, setArrayRoomsUser] = useState<TArrayRoomsUser[]>([]);
    useEffect(() => {
        getRooms(props.login).then(r => r);
    }, [props.login, props.update])

    async function getRooms(login: string) {
        await axios.post(HOST + "/rooms", {
            login
        }).then((promise) => {
            promise.data.map((el: TArrayRoomsUser) => {
                setArrayRoomsUser(prevState => {
                    if (prevState.find(item => item.id === el.id)) {
                        return prevState;
                    } else {
                        return [...prevState, el]
                    }
                })
                return null;
            })
        });
    }

    return (
        <div className={"Rooms"}>
            {
                arrayRoomsUser.map((el: TArrayRoomsUser) => {
                    return <Room key={el.id} roomInfo={el} currentUserNickname={props.login}/>;
                })
            }

        </div>
    );
}

export default Rooms;