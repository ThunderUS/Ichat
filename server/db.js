import  db from "pg";

const Pool=db.Pool;
const pool= new Pool({
  user:"postgres",
  password:"1234",
  host:"localhost",
  port:5432,
  database:"ichat",
});

export default pool;