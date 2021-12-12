import React, {Dispatch, SetStateAction} from 'react';
import "../../../style/LoginInfo.scss"
import noAvatar from "../../../images/NoAvatar.jpg";
import HOST from "../../../confige/config";


interface ILoginInfo {
    login: string,
    invite: Dispatch<SetStateAction<boolean>>
}

function LoginInfo(props: ILoginInfo) {
    const avatar = `${HOST}/${props.login}.jpg`;
    return (
        <div className={"LoginInfo"}>
            <img src={avatar} onError={(e) => {
                e.currentTarget.src = noAvatar;
            }} alt={"Avatar"}/>
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