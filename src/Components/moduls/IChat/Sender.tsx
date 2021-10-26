import React, {useState} from 'react';
import "../../../style/Sender.scss"

type TProps = {
    onClick: (value: string) => void;
}

function Sender(props: TProps) {
    const [value, setValue] = useState("");

    return (
        <div className={"Sender"}>
            <textarea value={value} onChange={event => {
                setValue(event.target.value)
            }} className={"Sender_text"}/>
            <div onClick={(e) => {
                e.preventDefault();
                props.onClick(value);
                setValue("");
            }} className={"Sender_button"}>&#9754;</div>
        </div>
    );
}

export default Sender;