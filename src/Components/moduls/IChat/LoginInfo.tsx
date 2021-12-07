import React, {Dispatch, SetStateAction} from 'react';
import "../../../style/LoginInfo.scss"
import noAvatar from "../../../images/NoAvatar.jpg";

interface ILoginInfo {
    login: string,
    invite: Dispatch<SetStateAction<boolean>>
}

function LoginInfo(props: ILoginInfo) {
    return (
        <div className={"LoginInfo"}>
            <img src={noAvatar} alt={"Avatar"}/>
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