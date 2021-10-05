import React from 'react';
import "../../style/LoginInfo.scss"

function LoginInfo() {
    return (
        <div className={"LoginInfo"}>
            <span className={"LoginInfo_nickname"}>Thunder</span>
            <div className={"LoginInfo_create"}>+</div>
        </div>
    );
}

export default LoginInfo;