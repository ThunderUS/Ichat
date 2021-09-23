import React from "react";
interface ICostumeCheckBox {
    classNameDiv?:string;
    classNameLabel:string;
    classNameInput:string;
    classNameSpan:string;
    children:React.ReactChild | React.ReactNode;
}

function CostumeCheckBox(props:ICostumeCheckBox) {
    return (
        <div className={props.classNameDiv}>
            <label className={props.classNameLabel}>
                <input
                    type={"checkbox"}
                    className={props.classNameInput}
                />
                <span className={props.classNameSpan}/>
                <span>{props.children}</span>

            </label>
        </div>
    );
}

export default CostumeCheckBox;