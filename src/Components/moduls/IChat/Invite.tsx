import React, {Dispatch, SetStateAction, useState} from 'react';
import "../../../style/Invite.scss";

type TProps = {
    func: Dispatch<SetStateAction<boolean>>,
    onClick: (value: string) => void
}


function Invite(props: TProps) {
    const [value, setValue] = useState("");
    const close = () => {
        props.func(false);
    }

    return (
        <div className={"Invite"}>
            <div className={"Invite_wrapper"}>
                <div onClick={close}
                     className={"Invite_wrapper-close"}>X
                </div>
                <input value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(e.currentTarget.value);
                }} placeholder={"Invite your friend..."} className={"Invite_wrapper-input"}/>
                <div className={"Invite_wrapper-buttons"}>
                    <button onClick={close} className={"Invite_wrapper-buttons-left"}>Cancel</button>
                    <button onClick={(event => {
                        event.preventDefault();
                        props.onClick(value);
                    })} className={"Invite_wrapper-buttons-right"}>Invite
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Invite;