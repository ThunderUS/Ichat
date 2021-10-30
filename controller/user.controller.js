import pool from "../server/db.js";
import Log from "../server/log.js"


class UserController {
  async createUser(req, res) {
    try {
      const {name, surname, login, password} = req.body;
      if (name && login && surname && password) {
        const newPerson = await pool
          .query("INSERT INTO users (name, surname,login) values ($1,$2,$3) RETURNING * ", [name, surname, login]);
        await pool
          .query("INSERT INTO aups (aups,user_id) values ($1,$2) RETURNING *", [password, newPerson["rows"][0]["id"]]);
        res.json(200);
        Log.setLog(`Registered new user: ${name} ${surname}`);
      } else {
        res.status(500).send("error");
        Log.setLog(`Error registration DATA is not correct (name:${name}, surname:${surname}, login:${login}, aups:${password})`)
      }
    } catch (e) {
      Log.setLog("error in createUser: " + e)
    }
  }

  async getLoginsUsers(req, res) {
    try {
      const allLogins = await pool
        .query("SELECT login FROM users");
      res.json(allLogins.rows);
      Log.setLog(`Request all USERS for registration`);
    } catch (e) {
      Log.setLog("error in getLoginsUsers: " + e);
    }
  }

  async loginUser(req, res) {
    try {
      const {login, password} = req.body;
      const userID = await pool
        .query("SELECT id FROM users WHERE login=$1", [login]);
      if (userID.rows[0]) {
        const userPAS = await pool
          .query("SELECT aups FROM aups WHERE user_id=$1", [userID.rows[0]["id"]]);
        if (userPAS.rows[0]["aups"] === password) {
          const user = await pool.query("SELECT * FROM users WHERE id=$1", [userID.rows[0]["id"]])
          res.json(user.rows[0]);
          Log.setLog(`${login} has logined in successfully!!`);
        } else {
          Log.setLog(`${login} wrong password`);
          res.json("LIPC");
        }
      } else {
        Log.setLog(`${login} wrong login`);
        res.json("ILPC")
      }
    } catch (e) {
      Log.setLog(`error in loginUser: ${e}`)
    }
  }

  async getRooms(req, res) {
    try {
      const {login} = req.body;
      const rooms = await pool.query(`SELECT *
                                      FROM rooms
                                      WHERE users LIKE $1`, ["%" + login + "%"]);
      res.json(rooms.rows);
    } catch (e) {
      res.json(e)
      Log.setLog(`error in getRooms: ${e}`);
    }

  }

  async getChats(req, res) {
    try {
      const {select} = req.body;
      if (select === 0 || select === undefined) {
        throw  new SyntaxError("wrong sql correct");
      }
      const chats = await pool.query(`${select}`);
      res.json(chats.rows);
    } catch (e) {
      res.json(e)
      Log.setLog(`error in getChats: ${e}`);
    }
  }

  async setRoom(req, res) {
    try {
      const {userNick, currentUser} = req.body;
      if (userNick && currentUser) {
        const roomType1 = await pool.query(`SELECT *
                                            FROM rooms
                                            WHERE users = $1 `, [`${userNick}/${currentUser}`])
        const roomType2 = await pool.query(`SELECT *
                                            FROM rooms
                                            WHERE users = $1 `, [`${currentUser}/${userNick}`])
        if (roomType1.rows.length === 0 && roomType2.rows.length === 0) {
          const crateRoomRow = await pool.query(`INSERT
                                                 into rooms (users)
                                                 values ($1) RETURNING id`, [`${currentUser}/${userNick}`])
          const req = `create TABLE chats_${crateRoomRow.rows[0].id}
                       (
                           id      SERIAL PRIMARY KEY,
                           login   VARCHAR(50),
                           message VARCHAR(255),
                           date    VARCHAR(50)
                       ) `
          await pool.query(req);
        }
        res.json(200);
      }
    } catch (e) {
      res.json(e)
      Log.setLog(`error in setRoom: ${e}`);
    }
  }
}

export default new UserController();