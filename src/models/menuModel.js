import pool from "../config/database.js";

export const getMenus = async () => {
  const result = await pool.query(
    "SELECT id, name, code, parent_id, level FROM menus ORDER BY id ASC"
  );
  return result.rows;
};

export const getMenuById = async (id) => {
  const result = await pool.query(
    "SELECT id, name, code, parent_id, level FROM menus WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

export const createMenu = async (name, code, parent_id = null, level = 0) => {
  const result = await pool.query(
    `INSERT INTO menus (name, code, parent_id, level) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, name, code, parent_id, level`,
    [name, code, parent_id, level]
  );
  return result.rows[0];
};

export const updateMenu = async (id, { name, code, parent_id, level }) => {
  const result = await pool.query(
    `UPDATE menus 
     SET name = COALESCE($1, name),
         code = COALESCE($2, code),
         parent_id = COALESCE($3, parent_id),
         level = COALESCE($4, level)
     WHERE id = $5
     RETURNING id, name, code, parent_id, level`,
    [name, code, parent_id, level, id]
  );
  return result.rows[0];
};

export const deleteMenu = async (id) => {
  const result = await pool.query(
    "DELETE FROM menus WHERE id = $1 RETURNING id, name, code",
    [id]
  );
  return result.rows[0];
};
