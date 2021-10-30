import React, {Dispatch, SetStateAction} from 'react';
import "../../../style/LoginInfo.scss"

interface ILoginInfo {
    name: string,
    surname: string,
    invite: Dispatch<SetStateAction<boolean>>
}

function LoginInfo(props: ILoginInfo) {
    return (
        <div className={"LoginInfo"}>
            <span className={"LoginInfo_nickname"}>{props.name + " " + props.surname}</span>
            <div onClick={() => {
                props.invite(true);
            }} className={"LoginInfo_create"}>+
            </div>
        </div>
    );
}

export default LoginInfo;