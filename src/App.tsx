import React from 'react';
import LoginForm from "./Components/Pages/LoginForm";
import IChat from "./Components/Pages/IChat";
import "./style/App.scss"
import {BrowserRouter, Route} from "react-router-dom";
import RegistrationForm from "./Components/Pages/RegistrationForm";
import {createStore} from "redux";
import {Provider} from "react-redux";

const defaultState={
    id:0,
    name:"",
    surname:"",
    login:""
}

const reducer= (state=defaultState,action:any)=>{
    switch (action.type){
        case "USER_CHANGE":
            console.log(action.payload);
            return {...state,
                id:action.payload.id,
                name:action.payload.name,
                surname: action.payload.surname,
                login: action.payload.login
            };
        default:
            return state;
    }
}
const store = createStore(reducer);

function App() {
  return (
    <BrowserRouter>
        <Provider store={store}>
            <div className="BGPicture">
                <Route  path={"/"} exact component={LoginForm}/>
                <Route  path={"/chat"} exact component={IChat}/>
                <Route  path={"/reg"} exact component={RegistrationForm}/>
            </div>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
