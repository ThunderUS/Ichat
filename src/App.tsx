import React from 'react';
import LoginForm from "./Components/LoginForm";
import "./style/App.scss"
import {BrowserRouter, Route} from "react-router-dom";
import RegistrationForm from "./Components/RegistrationForm";

function App() {
  return (
    <BrowserRouter>
        <div className="BGPicture">
            <Route  path={"/"} exact component={LoginForm} />
            <Route  path={"/reg"} exact component={RegistrationForm}/>
        </div>
    </BrowserRouter>
  );
}

export default App;
