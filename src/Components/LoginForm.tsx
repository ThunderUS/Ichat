import React, { useState} from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import "../style/loginForm.scss";
import CostumeCheckBox from "./UI/CostumeCheckBox";
import PasswordIcon from "./UI/PasswordIcon";
import {useHistory} from "react-router-dom";

function LoginForm(){
    const [showPassword,setShowPassword]=useState(false);
    const [loginValue,setLoginValue]=useState("");
    const [passwordValue,setPasswordValue]=useState("");
    const history=useHistory()
    function switchReg(){
        history.push("/reg")
    }

    return(
        <div className={"LF_wrapper"}>
            <form>
                <Input
                    className={"LF_Input"}
                    placeholder={"Login"}
                    maxLength={15}
                    onChange={(e:React.FormEvent<HTMLInputElement>)=>{
                        setLoginValue(e.currentTarget.value);
                    }}
                />
                <div className={"LF_inpPlusIcon"}>
                    <Input
                    className={"LF_Input"}
                    placeholder={"Password"}
                    type={showPassword
                        ?"text"
                        :"password"}
                    maxLength={15}
                    onChange={(e:React.FormEvent<HTMLInputElement>)=>{
                        setPasswordValue(e.currentTarget.value);
                    }}
                />
                    <PasswordIcon
                        height={17}
                        width={17}
                        className={"LF_passwordIcon"}
                        onClick={()=>{
                            setShowPassword(prevState => !prevState);
                        }}
                    />
                </div>

                <CostumeCheckBox classNameLabel={"LF_label"}
                                 classNameInput={"LF_checkbox"}
                                 classNameSpan={"LF_span"}
                                 classNameDiv={"LF_divWrapper"}
                > Remember me</CostumeCheckBox>
                <div className="LF_btnWrapper">
                    <Button
                        className={"LF_btn"}
                        disabled={!(loginValue && passwordValue)}
                    >Login</Button>

                    <Button className={"LF_btn"}
                            onClick={e => {
                                e.preventDefault();
                                switchReg();
                            }}
                    >Registration</Button>
                </div>
            </form>
        </div>
    );
}
export default LoginForm;