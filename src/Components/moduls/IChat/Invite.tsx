import React, {Dispatch, SetStateAction} from 'react';
import "../../../style/Invite.scss";

type TProps = {
    func: Dispatch<SetStateAction<Boolean>>
}

function Invite(props: TProps) {
    const close = () => {
        props.func(false);
    }
    return (
        <div className={"Invite"}>
            <div className={"Invite_wrapper"}>
                <div onClick={close}
                     className={"Invite_wrapper-close"}>X
                </div>
                <input placeholder={"Invite your friend..."} className={"Invite_wrapper-input"}/>
                <div className={"Invite_wrapper-buttons"}>
                    <button onClick={close} className={"Invite_wrapper-buttons-left"}>Cancel</button>
                    <button className={"Invite_wrapper-buttons-right"}>Invite</button>
                </div>
            </div>
        </div>
    );
}

export default Invite;