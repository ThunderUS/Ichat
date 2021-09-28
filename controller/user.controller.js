import pool from "../db.js";

class UserController {
  async createUser(req, res) {
    console.log("enter")
    const {name, surname, login, password} = req.body;
    if (name && login && surname && password) {
      const newPerson = await pool.query("INSERT INTO users (name, surname,login) values ($1,$2,$3) RETURNING * ", [name, surname, login]);
      await pool.query("INSERT INTO aups (aups,user_id) values ($1,$2) RETURNING *", [password, newPerson["rows"][0]["id"]]);
      res.json(newPerson);
    }
    res.status(500).send("error");
  }

  async getLoginsUsers(req, res) {
      const allLogins= await pool.query("SELECT login FROM users");
      res.json(allLogins.rows);
  }

  async loginUser(req, res) {
    const {login, password} = req.body;
    const userID = await pool.query("SELECT id FROM users WHERE login=$1", [login]);
    if (userID.rows[0]) {
      const userPAS = await pool.query("SELECT aups FROM aups WHERE user_id=$1", [userID.rows[0]["id"]]);
      if (userPAS.rows[0]["aups"] === password) {
        res.json("LPC");
      } else {
        res.json("LIPC");
      }
    } else {
      res.json("ILPC")
    }

  }
}

export default new UserController();