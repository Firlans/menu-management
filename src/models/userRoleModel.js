import pool from "../config/database.js";

export const assignRoleToUser = async (user_id, role_id) => {
    const result = await pool.query(
        `INSERT INTO user_roles (user_id, role_id)
     VALUES ($1, $2)
     RETURNING id, user_id, role_id`,
        [user_id, role_id]
    );
    return result.rows[0];
};

export const getRolesByUserId = async (user_id) => {
    const result = await pool.query(
        `SELECT ur.id, r.id as role_id, r.name as role_name, r.code as role_code
     FROM user_roles ur
     JOIN roles r ON ur.role_id = r.id
     WHERE ur.user_id = $1`,
        [user_id]
    );
    return result.rows;
};

export const getUsersByRoleId = async (role_id) => {
    const result = await pool.query(
        `SELECT ur.id, u.id as user_id, u.username, u.email
     FROM user_roles ur
     JOIN users u ON ur.user_id = u.id
     WHERE ur.role_id = $1`,
        [role_id]
    );
    return result.rows;
};

export const removeRoleFromUser = async (user_id, role_id) => {
    const result = await pool.query(
        `DELETE FROM user_roles 
     WHERE user_id = $1 AND role_id = $2
     RETURNING id, user_id, role_id`,
        [user_id, role_id]
    );
    return result.rows[0];
};

export const deleteUserRoles = async (user_id) => {
    const result = await pool.query(
        `DELETE FROM user_roles 
     WHERE user_id = $1
     RETURNING id, user_id, role_id`,
        [user_id]
    );
    return result.rows;
};
