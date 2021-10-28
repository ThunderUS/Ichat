import db from "pg";

//db.defaults.ssl = true;
const Pool = db.Pool;
const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  database: "ichat",
});

// const pool = new Pool({
//   user: "kzfajvjggkhiey",
//   password: "e969bdce6f568662be9f0a91c66e3ac610098988b4deffa562377145df84aa93",
//   host: "ec2-52-3-79-87.compute-1.amazonaws.com",
//   port: 5432,
//   database: "ddc539biiorft6",
// });
export default pool;