import React from 'react';
//import LoginForm from "./Components/LoginForm";
import IChat from "./Components/Pages/IChat";
import "./style/App.scss"
import {BrowserRouter, Route} from "react-router-dom";
import RegistrationForm from "./Components/Pages/RegistrationForm";

function App() {
  return (
    <BrowserRouter>
        <div className="BGPicture">
            <Route  path={"/"} exact component={IChat} />
            <Route  path={"/reg"} exact component={RegistrationForm}/>
        </div>
    </BrowserRouter>
  );
}

export default App;
