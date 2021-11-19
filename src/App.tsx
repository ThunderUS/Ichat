import React, {Suspense} from 'react';
import "./style/App.scss"
import LoginForm from "./Components/Pages/LoginForm";
import {BrowserRouter, Route} from "react-router-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
//import IChat from "./Components/Pages/IChat";
//import RegistrationForm from "./Components/Pages/RegistrationForm";

const defaultState = {
    id: 0,
    name: "",
    surname: "",
    login: "",
    roomID: 0,
    message: {
        id: 0,
        login: "",
        message: "",
        date: ""
    },
}
const IChat = React.lazy(() => import("./Components/Pages/IChat"));
const RegistrationForm = React.lazy(() => import("./Components/Pages/RegistrationForm"));

const reducerUserInformation = (state = defaultState, action: any) => {
    switch (action.type) {
        case "USER_CHANGE":
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                surname: action.payload.surname,
                login: action.payload.login,
                roomID: action.payload.roomID,
            };
        case "ROOM_ID":
            return {
                ...state,
                roomID: action.payload.roomID
            };
        case "MESSAGE":
            console.log(action.payload, " Case");
            return {
                ...state, message: {
                    id: action.payload.id,
                    login: action.payload.login,
                    message: action.payload.message,
                    date: action.payload.date
                }
            };
        default:
            return state;
    }
}

const store = createStore(reducerUserInformation);


function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={""}>
                <Provider store={store}>
                    <div className="BGPicture">
                        <Route path={"/"} exact component={LoginForm}/>
                        <Route path={"/chat"} exact component={IChat}/>
                        <Route path={"/reg"} exact component={RegistrationForm}/>
                    </div>
                </Provider>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
