import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "password",
  database: "postgres",
  port: 5432,
});

export default pool;