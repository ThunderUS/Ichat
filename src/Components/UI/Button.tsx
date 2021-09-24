import React from "react";
interface IProps {
    className?:string;
    onClick?:(e:React.FormEvent<HTMLButtonElement>)=>void;
    children?: React.ReactChild | React.ReactNode;
    disabled?:boolean;
}

function Button (props:IProps) {
    console.log("Render");
    return (
        <div>
            <button
                {...props}

            >{props.children}</button>
        </div>
    );
}

export default React.memo(Button);