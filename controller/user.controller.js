import pool from "../db.js";
import Log from "./log.js"

class UserController {
  async createUser(req, res) {
    const {name, surname, login, password} = req.body;
    if (name && login && surname && password) {
      const newPerson = await pool
        .query("INSERT INTO users (name, surname,login) values ($1,$2,$3) RETURNING * ", [name, surname, login]);
      await pool
        .query("INSERT INTO aups (aups,user_id) values ($1,$2) RETURNING *", [password, newPerson["rows"][0]["id"]]);
      res.json(newPerson);
      Log.setLog(`Registered new user: ${name} ${surname}`);
    }
    res.status(500).send("error");
    Log.setLog(`Error registration DATA is not correct (name:${name}, surname:${surname}, login:${login}, aups:${password})`)
  }

  async getLoginsUsers(req, res) {
      const allLogins= await pool
        .query("SELECT login FROM users");

      res.json(allLogins.rows);
      Log.setLog(`Request all USERS for registration`);
  }

  async loginUser(req, res) {
    const {login, password} = req.body;
    const userID = await pool
      .query("SELECT id FROM users WHERE login=$1", [login]);
    if (userID.rows[0]) {
      const userPAS = await pool
        .query("SELECT aups FROM aups WHERE user_id=$1", [userID.rows[0]["id"]]);
      if (userPAS.rows[0]["aups"] === password) {
        res.json("LPC");
        Log.setLog(`${login} has logined in successfully!!`);
      } else {
        Log.setLog(`${login} wrong password`);
        res.json("LIPC");
      }
    } else {
      Log.setLog(`${login} wrong login`);
      res.json("ILPC")
    }

  }
}

export default new UserController();