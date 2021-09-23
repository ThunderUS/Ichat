import React, {useState} from "react";
import "../style/RegistrationForm.scss";
import Input from "./UI/Input";
import Button from "./UI/Button";
import iconBack from "../images/back-arrow_icon.png";
import axios from "axios";


function RegistrationForm() {
    const [name,setName]=useState("");
    const [surname,setSurname]=useState("");
    const [login,setLogin]=useState("");
    const [password,setPassword]=useState("");

    function clearAllInput():void{
        setName("");
        setSurname("");
        setLogin("");
        setPassword("");
    }
    function activateButton():boolean{
        return Boolean( name || surname || login || password);
    }

    return (
        <div className={"BGPicture"}>
        <div className={"RF_wrapper"}>
            <form>
                <div className="RF_iconBack"
                 onClick={(event => {
                     event.preventDefault();

                 })}
                >
                    <img src={iconBack} alt={"arrow back"}/>
                </div>
                <h2 className={"RF_registration"}>Registration.</h2>
                <section className="RF_nameSurname">
                    <div className="RF_nameSurname_wrapper">
                        <div className="RF_name">
                            <Input className={"RF_inputs"}
                                   value={name}
                                   placeholder={"Name..."}
                                onChange={(e:React.FormEvent<HTMLInputElement>) =>{
                                    setName(e.currentTarget.value);
                                } }/>
                        </div>
                        <div className="RF_surname">
                            <Input className={"RF_inputs"}
                                   value={surname}
                                   placeholder={"Second Name..."}
                                onChange={(e:React.FormEvent<HTMLInputElement>) =>{
                                    setSurname(e.currentTarget.value);}}
                            />
                        </div>
                    </div>
                </section>
                <section className="RF_phoneEmail">
                    <div className="RF_phoneEmail_wrapper">
                        <div className="RF_phone">
                            <Input className={"RF_inputs"}
                                   value={login}
                                   placeholder={"Nickname..."}
                                onChange={(e:React.FormEvent<HTMLInputElement>) =>{
                                    setLogin(e.currentTarget.value);
                                } }/>
                        </div>
                        <div className="RF_email">
                            <Input className={"RF_inputs"}
                                   type={"password"}
                                   value={password}
                                   placeholder={"Password..."}
                                onChange={(e:React.FormEvent<HTMLInputElement>) =>{
                                    setPassword(e.currentTarget.value);}}
                            />
                        </div>
                    </div>
                </section>
                <section className="RF_button">
                    <div className="RF_button_wrapper">
                        <Button className={"RF_buttons"}
                                disabled={!activateButton()}
                        onClick={
                            (e:React.FormEvent<HTMLButtonElement>)=>{
                            e.preventDefault();
                            clearAllInput();
                        }}
                        > Clear all</Button>
                        <Button className={"RF_buttons"}
                                disabled={!(name && surname && login && password)}
                                onClick={e => {
                                    e.preventDefault();
                                    axios.post("http://localhost:9999/reg",{
                                        name,
                                        surname,
                                        login,
                                        password
                                    });
                                }}
                        > Submit</Button>
                    </div>
                </section>
            </form>
        </div>
        </div>
    );
}

export default RegistrationForm;