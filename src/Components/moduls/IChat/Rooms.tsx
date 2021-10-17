import React, {useEffect, useState} from 'react';
import "../../../style/Rooms.scss"
import axios from "axios";
import Room from "../../Room";


interface IRooms {
    login: string,
}

type TArrayRoomsUser = {
    id: number,
    users: string
}

function Rooms(props: IRooms) {
    const [arrayRoomsUser, setArrayRoomsUser] = useState<TArrayRoomsUser[]>([]);
    useEffect(() => {
        getRooms(props.login).then(r => r);
    }, [props.login])

    async function getRooms(login: string) {
        await axios.post("http://localhost:8080/rooms", {
            login
        }).then((promise) => {
            promise.data.map((el: any) => {
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
                arrayRoomsUser.map((el) => {
                    return <Room key={el.id} roomInfo={el} currentUserNickname={props.login}/>;
                })
            }
            
        </div>
    );
}

export default Rooms;