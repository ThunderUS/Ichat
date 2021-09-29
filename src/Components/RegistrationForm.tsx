import React, {useEffect, useState} from "react";
import "../style/RegistrationForm.scss";
import Input from "./UI/Input";
import Button from "./UI/Button";
import iconBack from "../images/back-arrow_icon.png";
//import axios from "axios";
import {useHistory, Link} from "react-router-dom";
import {RFSchema} from "../Validations/RFValidation";
import * as yup from "yup";
import axios from "axios";





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
    const history = useHistory();
    const [usersLogin,setUsersLogin]=useState([]);

    useEffect(()=>{
      axios.get("http://localhost:8080/user/list").then((response)=>{
           setUsersLogin(response.data.map((el: { [s: string]: unknown; } | ArrayLike<unknown>)=>{
               return Object.values(el);
           }).reduce((flat: string | any[], current: any)=>{
               return flat.concat (current);
           }));
        });

    },[]);

    console.log(usersLogin);
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
    async function submitData(formData:RegData){
        const valid =await validationData(formData, RFSchema, ERR_MESSAGE);
        if (valid){
            console.log("data will send")
            const data=await axios.post("http://localhost:8080/user", formData);
            if (data.status===200){
                setServAnswer(true);
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
                                     onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                         setLogin(e.currentTarget.value);
                                     }}/>
                            </div>
                            <div>
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
                                    disabled={!(name && surname && login && password)}
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