import React from 'react';
import "../../../style/Sender.scss"
function Sender() {
    return (
        <div className={"Sender"}>
            <textarea className={"Sender_text"}/>
            <div className={"Sender_button"}>&#9754;</div>
        </div>
    );
}

export default Sender;