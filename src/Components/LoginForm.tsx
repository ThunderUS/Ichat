import React, { useState} from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import "../style/loginForm.scss";
import CostumeCheckBox from "./UI/CostumeCheckBox";
import PasswordIcon from "./UI/PasswordIcon";
import {useHistory} from "react-router-dom";
import {LFSchema} from "../Validations/LFValidation"
import axios from "axios";

function LoginForm(){
    const [showPassword,setShowPassword]=useState(false);
    const [loginValue,setLoginValue]=useState("");
    const [passwordValue,setPasswordValue]=useState("");
    const history=useHistory()
    function switchReg(){
        history.push("/reg")
    }
    function clearerInput():void{
        setLoginValue("");
        setPasswordValue("");
    }
    return(
        <div className={"LF_wrapper"}>
            <form>
                <Input
                    className={"LF_Input"}
                    placeholder={"Login"}
                    value={loginValue}
                    maxLength={15}
                    onChange={(e:React.FormEvent<HTMLInputElement>)=>{
                        setLoginValue(e.currentTarget.value);
                    }}
                />
                <div className={"LF_inpPlusIcon"}>
                    <Input
                    className={"LF_Input"}
                    placeholder={"Password"}
                    value={passwordValue}
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
                        onClick={async(e)=>{
                            e.preventDefault();
                            const formData={
                                login:loginValue,
                                password:passwordValue,
                            }
                            if(await LFSchema.isValid(formData)){
                                const response=await axios.post("http://localhost:8080/login",formData);
                                if(response.data==="LIPC"){
                                    alert("Wrong Password");
                                    clearerInput();
                                }else if (response.data==="ILPC"){
                                    alert("Wrong Login");
                                    clearerInput();
                                } else{
                                    console.log("all good");
                                }
                            } else{
                                clearerInput();
                                alert(`Wrong Data. 
                                Login should be min 4 - max 15 symbols.
                                Password should be min 8 - max 15 symbols. `);

                            }
                        }}
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