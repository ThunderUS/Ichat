import React from "react";

interface IProps {
    className?:string;
    onChange:(e:React.FormEvent<HTMLInputElement>)=>void;
    placeholder?:string;
    type?:string;
    value?:string;
    maxLength?:number;
    onBlur?:(e:React.FormEvent<HTMLInputElement>)=>void;
}
function Input(props:IProps) {
    return (
        <div>
            <input
                placeholder={props.placeholder}

                {...props}
            />
        </div>
    );
}

export default Input;