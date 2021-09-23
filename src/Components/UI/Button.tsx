import React from "react";
interface IProps {
    className?:string;
    onClick?:(e:React.FormEvent<HTMLButtonElement>)=>void;
    children?: React.ReactChild | React.ReactNode;
    disabled?:boolean;
}

function Button(props:IProps) {
    return (
        <div>
            <button
                {...props}
            >{props.children}</button>
        </div>
    );
}

export default Button;