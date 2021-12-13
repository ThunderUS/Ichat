import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import "../../../style/LoginInfo.scss"
import noAvatar from "../../../images/NoAvatar.jpg";
import HOST from "../../../confige/config";
import axios from "axios";


interface ILoginInfo {
    login: string,
    invite: Dispatch<SetStateAction<boolean>>
}

function LoginInfo(props: ILoginInfo) {
    const avatar = `${HOST}/${props.login}.jpg`;
    const [isAvatar, setIsAvatar] = useState<boolean>(false);
    useEffect(() => {
        axios.get(HOST + `/isavatar?login=${props.login}`)
            .then((data) => {
                setIsAvatar(data.data);
            })
    }, [props.login]);
    return (
        <div className={"LoginInfo"}>
            <img src={isAvatar ? avatar : noAvatar} alt={"Avatar"}/>
            <div className={"LoginInfo_wrapper-login"}>
                <span className={"LoginInfo_nickname"}>{props.login}</span>
                <div onClick={() => {
                    props.invite(true);
                }} className={"LoginInfo_create"}>+
                </div>
            </div>
        </div>
    );
}

export default LoginInfo;