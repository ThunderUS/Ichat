import React from 'react';
import "../../../style/LoginInfo.scss"

interface ILoginInfo{
    name:string,
    surname:string
}

function LoginInfo(props:ILoginInfo) {
    return (
        <div className={"LoginInfo"}>
            <span className={"LoginInfo_nickname"}>{props.name+" "+props.surname}</span>
            <div className={"LoginInfo_create"}>+</div>
        </div>
    );
}

export default LoginInfo;