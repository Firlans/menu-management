import pool from "../config/database.js";

export const getUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 LIMIT 1",
    [email]
  );
  return result.rows[0]; // return single user
};

export const createUser = async (username, email, hashedPassword) => {
  const result = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
    [username, email, hashedPassword]
  );
  return result.rows[0];
};

export const updateUser = async (id, { username, email, password }) => {
  const result = await pool.query(
    `UPDATE users 
     SET username = COALESCE($1, username), 
         email = COALESCE($2, email), 
         password = COALESCE($3, password),
         updated_at = NOW()
     WHERE id = $4
     RETURNING id, username, email`,
    [username, email, password, id]
  );
  return result.rows[0];
};

export const deleteUser = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING id, username, email",
    [id]
  );
  return result.rows[0]; // return deleted user info
};
