import React from 'react';
import "../../../style/Rooms.scss"
//import Room from "../../Room";
import axios from "axios";


interface IRooms {
        login:string,
}

function Rooms(props:IRooms) {
        let test1: any[]=[];
        const rooms=getRooms(props.login);
        async function getRooms(login:string){
            const res= await axios.post("http://localhost:8080/rooms",{
                    login
            });
            return res;
        }
        rooms.then(date => {
                let test=date.data;
                test.map((el:any)=>{
                    test1.push(el)  ;
                })
        })
        console.log(test1)
    return (
        <div  className={"Rooms"}>

        </div>
    );
}

export default Rooms;