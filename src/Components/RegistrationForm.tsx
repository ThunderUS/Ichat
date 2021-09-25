import React, {useState} from "react";
import "../style/RegistrationForm.scss";
import Input from "./UI/Input";
import Button from "./UI/Button";
import iconBack from "../images/back-arrow_icon.png";
import axios from "axios";
import {useHistory,Link} from "react-router-dom";
import {RFSchema} from "../Validations/RFValidation";



function RegistrationForm() {
    const [name,setName]=useState("");
    const [surname,setSurname]=useState("");
    const [login,setLogin]=useState("");
    const [password,setPassword]=useState("");
    const [servAnswer,setServAnswer]=useState(true);
    const history=useHistory()
    function switchLogin(){
        history.push("/")
    }

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
                        <Link to={"/"} className={"RF_completed_link"}><h5> Return to login form </h5></Link>
                      </div>

                }

                {
                    !servAnswer &&
                    <section className="RF_nameSurname">
                      <div className="RF_nameSurname_wrapper">
                        <div >
                          <Input className={"RF_inputs"}
                                 value={name}
                                 placeholder={"Name..."}
                                 onChange={(e:React.FormEvent<HTMLInputElement>) =>{
                                     setName(e.currentTarget.value);
                                 } }/>
                        </div>
                        <div >
                          <Input className={"RF_inputs"}
                                 value={surname}
                                 placeholder={"Second Name..."}
                                 onChange={(e:React.FormEvent<HTMLInputElement>) =>{
                                     setSurname(e.currentTarget.value);}}
                          />
                        </div>
                      </div>
                    </section>
                }
                {
                    !servAnswer &&
                    <section className={"LoinPassword"} >
                      <div className="RF_LoginPassword_wrapper">
                        <div >
                          <Input className={"RF_inputs"}
                                 value={login}
                                 placeholder={"Nickname..."}
                                 onChange={(e:React.FormEvent<HTMLInputElement>) =>{
                                     setLogin(e.currentTarget.value);
                                 } }/>
                        </div>
                        <div >
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
                }
                {
                    !servAnswer &&
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
                                onClick={async e => {
                                    e.preventDefault();
                                    const formData={
                                        name,
                                        surname,
                                        login,
                                        password
                                    }
                                    if(await RFSchema.isValid(formData)){
                                        console.log("everything good")
                                        const test= await axios.post("http://localhost:9999/reg",formData);
                                        if (test.status===200){
                                            setServAnswer(true);
                                        }

                                    } else{

                                        alert(`Wrong Data. 
                                Name should be min 3 - max 15 symbols.  
                                SecondName should be min 3 - max 15 symbols.      
                                Login should be min 4 - max 15 symbols.
                                Password should be min 8 - max 15 symbols. `);
                                        clearAllInput();
                                    }

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