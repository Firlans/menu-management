import pool from "../config/database.js";

// 🔹 Ambil semua role
export const getRoles = async () => {
  const result = await pool.query("SELECT id, name, code FROM roles ORDER BY id ASC");
  return result.rows;
};

// 🔹 Ambil role by ID
export const getRoleById = async (id) => {
  const result = await pool.query("SELECT id, name, code FROM roles WHERE id = $1", [id]);
  return result.rows[0];
};

// 🔹 Create role
export const createRole = async (name, code) => {
  const result = await pool.query(
    "INSERT INTO roles (name, code) VALUES ($1, $2) RETURNING id, name, code",
    [name, code]
  );
  return result.rows[0];
};

// 🔹 Update role
export const updateRole = async (id, { name, code }) => {
  const result = await pool.query(
    `UPDATE roles 
     SET name = COALESCE($1, name),
         code = COALESCE($2, code)
     WHERE id = $3
     RETURNING id, name, code`,
    [name, code, id]
  );
  return result.rows[0];
};

// 🔹 Delete role
export const deleteRole = async (id) => {
  const result = await pool.query("DELETE FROM roles WHERE id = $1 RETURNING id, name, code", [id]);
  return result.rows[0];
};
