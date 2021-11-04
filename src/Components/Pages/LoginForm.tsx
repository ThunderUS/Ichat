import React, {useState} from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import "../../style/loginForm.scss";
import CostumeCheckBox from "../UI/CostumeCheckBox";
import PasswordIcon from "../UI/PasswordIcon";
import {useHistory} from "react-router-dom";
import {LFSchema} from "../../Validations/LFValidation"
import axios from "axios";
import {useDispatch} from "react-redux";
import HOST from "../../confige/config";

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();


    function switchReg() {
        history.push("/reg")
    }

    function clearerInput(): void {
        setLoginValue("");
        setPasswordValue("");
    }

    return (<>
            <div className={"LF_wrapper"}>
                <form>
                    <Input
                        className={"LF_Input"}
                        placeholder={"Login"}
                        value={loginValue}
                        maxLength={15}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            setLoginValue(e.currentTarget.value);
                        }}
                    />
                    <div className={"LF_inpPlusIcon"}>
                        <Input
                            className={"LF_Input"}
                            placeholder={"Password"}
                            value={passwordValue}
                            type={showPassword
                                ? "text"
                                : "password"}
                            maxLength={15}
                            onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                setPasswordValue(e.currentTarget.value);
                            }}
                        />
                        <PasswordIcon
                            height={17}
                            width={17}
                            className={"LF_passwordIcon"}
                            onClick={() => {
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
                            onClick={async (e) => {
                                e.preventDefault();
                                const formData = {
                                    login: loginValue,
                                    password: passwordValue,
                                }
                                if (await LFSchema.isValid(formData)) {
                                    const response = await axios.post(HOST + "/login", formData);
                                    if (response.data === "LIPC") {
                                        alert("Wrong Password");
                                        clearerInput();
                                    } else if (response.data === "ILPC") {
                                        alert("Wrong Login");
                                        clearerInput();
                                    } else {
                                        dispatch({type: "USER_CHANGE", payload: response.data})
                                        history.push("/chat");
                                    }
                                } else {
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
            <div className={"Info"}>
                <div className={"Info_wrapper"}>
                    <span className={"Info_title"}>About</span>
                    <span className={"Info_text"}> &nbsp; The application is written using React.js, the components are
                    made in functional styles.
                    The chat consists of two branches Front end and Back end. Node was used for the back end, as well
                    as libraries Express and Socket.io. The logging function is written in the server, files created
                    for each day.
                    The FS library is used to work with the file system. The front end is divided into modules.
                    The useState, useEffect hooks are used. Redux is used to store state.The application works with a
                    PostgreSQL database.
            </span>
                    <span className={"Info_title"}>{`Skills`}</span>
                    <span>HTML, SASS, CSS, TypeScript, React.js, Redux, Node.js, Express, Socket.io, PostgreSQL</span>
                </div>
                <div className={"Info_hoToUse"}>
                    <span className={"Info_title"}>How to use</span>
                    <span className={"Info_text"}> To use the program, you can register new users,
                        or use two test accounts.
                    </span>
                    <span> 1) Thunder | 12345678 </span>
                    <span> 2) Test1 &nbsp;&nbsp;&nbsp;&nbsp; | 12345678 </span>
                </div>
            </div>
        </>
    );
}

export default LoginForm;