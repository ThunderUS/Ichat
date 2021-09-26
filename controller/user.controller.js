class UserController{
    async createUser(req,res){
        const {name,surname,login,password}=req.body;
        console.log(name,surname,login,password)
        res.json("ok");
        //todo finish DB
    }
    async getLoginsUsers(req,res){

    }
    async getUserByLogin(req,res){

    }
}

export default  new UserController();