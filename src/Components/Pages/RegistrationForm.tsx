import React, {useEffect, useState} from "react";
import "../../style/RegistrationForm.scss";
import Input from "../UI/Input";
import Button from "../UI/Button";
import iconBack from "../../images/back-arrow_icon.png";
import {useHistory, Link} from "react-router-dom";
import {RFSchema} from "../../Validations/RFValidation";
import * as yup from "yup";
import axios from "axios";
import HOST from "../../confige/config";


interface RegData {
    name: string,
    surname: string,
    login: string,
    password: string
}

function RegistrationForm() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [servAnswer, setServAnswer] = useState(false);
    const [loginCheck, setLoginCheck] = useState<boolean>();
    const history = useHistory();
    const [usersLogin, setUsersLogin] = useState<string[]>([]);

    useEffect(() => {
        axios.get(HOST + "/user/list").then((response) => {
            setUsersLogin(response.data.map((el: { [s: string]: unknown; } | ArrayLike<unknown>) => {
                return Object.values(el);
            }).reduce((flat: string, current: string) => {
                return flat.concat(current);
            }));
        });

    }, []);

    const ERR_MESSAGE: string = `              Wrong Data. 
                                Name should be min 3 - max 15 symbols.  
                                SecondName should be min 3 - max 15 symbols.      
                                Login should be min 4 - max 15 symbols.
                                Password should be min 8 - max 15 symbols. `

    function switchLogin() {
        history.push("/")
    }

    function clearAllInput(): void {
        setName("");
        setSurname("");
        setLogin("");
        setPassword("");
    }

    function activateButton(): boolean {
        return Boolean(name || surname || login || password);
    }

    async function validationData(data: RegData, schema: yup.SchemaOf<RegData>, error: string) {
        if (await schema.isValid(data)) {
            return true;
        } else {
            alert(error);
            clearAllInput();
            return false;
        }
    }

    async function submitData(formData: RegData) {
        const valid = await validationData(formData, RFSchema, ERR_MESSAGE);
        if (valid) {
            const data = await axios.post(HOST + "/user", formData);
            if (data.status === 200) {
                setServAnswer(true);
            } else {
                alert("500 Error on the server side or network problem.")
            }
        }
    }

    return (
        <div className={"BGPicture"}>
            <div className={"RF_wrapper"}>
                <form>
                    <div className="RF_iconBack"
                         onClick={(event => {
                             event.preventDefault();
                             switchLogin();
                         })}
                    >
                        <img src={iconBack} alt={"arrow back"}/>
                    </div>
                    <h2 className={"RF_registration"}>Registration.</h2>
                    {
                        servAnswer &&
                        <div className={"RF_completed"}>
                          <h2>Completed!</h2>
                          <Link to={"/"} className={"RF_completed_link"}>
                            <h5> Return to login form </h5>
                          </Link>
                        </div>
                    }
                    {
                        !servAnswer &&
                        <section className="RF_nameSurname">
                          <div className="RF_nameSurname_wrapper">
                            <div>
                              <Input className={"RF_inputs"}
                                     value={name}
                                     placeholder={"Name..."}
                                     onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                         setName(e.currentTarget.value);
                                     }}/>
                            </div>
                            <div>
                              <Input className={"RF_inputs"}
                                     value={surname}
                                     placeholder={"Second Name..."}
                                     onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                         setSurname(e.currentTarget.value);
                                     }}
                              />
                            </div>
                          </div>
                        </section>
                    }
                    {
                        !servAnswer &&
                        <section className={"LoinPassword"}>
                          <div className="RF_LoginPassword_wrapper">
                            <div>
                              <Input className={"RF_inputs"}
                                     value={login}
                                     placeholder={"Nickname..."}
                                     onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                                         if (e.currentTarget.value) {
                                             if (usersLogin.includes(e.currentTarget.value)) {
                                                 e.currentTarget.style.border = "1.5px solid red";
                                                 setLoginCheck(false);
                                             } else {
                                                 e.currentTarget.style.border = "1.5px solid green";
                                                 setLoginCheck(true);
                                             }
                                         }
                                     }
                                     }

                                     onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                         setLogin(e.currentTarget.value);
                                     }}/>

                              <Input className={"RF_inputs"}
                                     type={"password"}
                                     value={password}
                                     placeholder={"Password..."}
                                     onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                         setPassword(e.currentTarget.value);
                                     }}
                              />
                            </div>
                          </div>
                        </section>
                    }
                    {
                        !servAnswer &&
                        <section className="RF_button">
                          <div className="RF_button_wrapper">
                            <Button className={"RF_buttons"}
                                    disabled={!activateButton()}
                                    onClick={
                                        (e: React.FormEvent<HTMLButtonElement>) => {
                                            e.preventDefault();
                                            clearAllInput();
                                        }}
                            > Clear all</Button>
                            <Button className={"RF_buttons"}
                                    disabled={!(name && surname && login && password && loginCheck)}
                                    onClick={async e => {
                                        e.preventDefault();
                                        const formData = {
                                            name,
                                            surname,
                                            login,
                                            password
                                        }
                                        await submitData(formData);
                                    }}
                            > Submit</Button>
                          </div>
                        </section>
                    }
                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;