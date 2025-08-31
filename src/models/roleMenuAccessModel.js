import pool from "../config/database.js";

export const grantMenuAccess = async (role_id, menu_id, permissions) => {
    const {
        can_create = false,
        can_read = true,
        can_update = false,
        can_delete = false,
    } = permissions;

    const result = await pool.query(
        `INSERT INTO role_menu_access (role_id, menu_id, can_create, can_read, can_update, can_delete)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
        [role_id, menu_id, can_create, can_read, can_update, can_delete]
    );

    return result.rows[0];
};

export const getMenuAccessByRole = async (role_id) => {
    const result = await pool.query(
        `SELECT rma.id, rma.role_id, rma.menu_id, m.name as menu_name, m.code as menu_code,
            rma.can_create, rma.can_read, rma.can_update, rma.can_delete
     FROM role_menu_access rma
     JOIN menus m ON rma.menu_id = m.id
     WHERE rma.role_id = $1`,
        [role_id]
    );

    return result.rows;
};

export const updateMenuAccess = async (role_id, menu_id, permissions) => {
    const {
        can_create = false,
        can_read = true,
        can_update = false,
        can_delete = false,
    } = permissions;

    const result = await pool.query(
        `UPDATE role_menu_access
     SET can_create = $3, can_read = $4, can_update = $5, can_delete = $6
     WHERE role_id = $1 AND menu_id = $2
     RETURNING *`,
        [role_id, menu_id, can_create, can_read, can_update, can_delete]
    );

    return result.rows[0];
};

export const revokeMenuAccess = async (role_id, menu_id) => {
    const result = await pool.query(
        `DELETE FROM role_menu_access
     WHERE role_id = $1 AND menu_id = $2
     RETURNING *`,
        [role_id, menu_id]
    );

    return result.rows[0];
};
