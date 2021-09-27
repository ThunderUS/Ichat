import pool from "../db.js";
class UserController{
    async createUser(req,res){
        const {name,surname,login,password}=req.body;

        const newPerson= await pool.query("INSERT INTO users (name, surname,login) values ($1,$2,$3) RETURNING * ",[name,surname,login]);
        //console.log(newPerson["rows"][0]["id"]);
        await pool.query("INSERT INTO aups (aups,user_id) values ($1,$2) RETURNING *",[password,newPerson["rows"][0]["id"]]);
        res.json(newPerson);

    }
    async getLoginsUsers(req,res){

    }
    async getUserByLogin(req,res){

    }
}

export default  new UserController();