import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
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
    const inputFile = useRef(null);
    const [update, setUpdate] = useState<boolean>(false)
    useEffect(() => {
        axios.get(HOST + `/isavatar?login=${props.login}`)
            .then((data) => {
                setIsAvatar(data.data);
            })
    }, [props.login, update]);
    return (
        <div className={"LoginInfo"}>
            <img src={isAvatar ? avatar : noAvatar} alt={"Avatar"} onClick={() => {
                // @ts-ignore
                inputFile && inputFile.current.click();


            }}/>
            <input ref={inputFile} type="file" accept={".jpg"} onChange={event => {

                const formData = new FormData();
                // @ts-ignore
                formData.append("file", event?.target?.files[0]);
                formData.append('login', props.login);
                axios.post(HOST + "/uploadavatar", formData).then(data => {
                    if (data.status === 200) {
                        setUpdate(!update);
                    }
                });
            }}/>
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