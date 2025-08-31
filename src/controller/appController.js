import { success, error, invalidParameter } from "../utils/response.js";
import {
    getMenus,
    getMenuById,
    createMenu as createMenuModel,
    updateMenu as updateMenuModel,
    deleteMenu as deleteMenuModel,
} from "../models/menuModel.js";

import {
  getRoles,
  getRoleById,
  createRole as createRoleModel,
  updateRole as updateRoleModel,
  deleteRole as deleteRoleModel,
} from "../models/roleModel.js";

import {
  assignRoleToUser,
  getRolesByUserId,
  getUsersByRoleId,
  removeRoleFromUser,
  deleteUserRoles,
} from "../models/userRoleModel.js";

import {
  grantMenuAccess,
  getMenuAccessByRole,
  updateMenuAccess,
  revokeMenuAccess,
} from "../models/roleMenuAccessModel.js";

export const createRoleMenuAccess = async (req, res) => {
  try {
    const { role_id, menu_id, permissions } = req.body;

    if (!role_id || !menu_id) {
      return res.status(400).json(invalidParameter("role_id dan menu_id wajib diisi"));
    }

    const data = await grantMenuAccess(role_id, menu_id, permissions || {});
    return res.status(201).json(success(data, "post"));
  } catch (err) {
    console.error("Error creating role_menu_access:", err.message);
    return res.status(500).json(error("Gagal membuat role menu access"));
  }
};

export const getRoleMenuAccess = async (req, res) => {
  try {
    const { role_id } = req.params;

    const data = await getMenuAccessByRole(role_id);
    return res.status(200).json(success(data, "get"));
  } catch (err) {
    console.error("Error fetching role_menu_access:", err.message);
    return res.status(500).json(error("Gagal mengambil role menu access"));
  }
};

export const updateRoleMenuAccess = async (req, res) => {
  try {
    const { role_id, menu_id, permissions } = req.body;

    if (!role_id || !menu_id) {
      return res.status(400).json(invalidParameter("role_id dan menu_id wajib diisi"));
    }

    const data = await updateMenuAccess(role_id, menu_id, permissions || {});
    if (!data) {
      return res.status(404).json(error("Role menu access tidak ditemukan", 404));
    }

    return res.status(200).json(success(data, "put"));
  } catch (err) {
    console.error("Error updating role_menu_access:", err.message);
    return res.status(500).json(error("Gagal update role menu access"));
  }
};

export const deleteRoleMenuAccess = async (req, res) => {
  try {
    const { role_id, menu_id } = req.body;

    if (!role_id || !menu_id) {
      return res.status(400).json(invalidParameter("role_id dan menu_id wajib diisi"));
    }

    const data = await revokeMenuAccess(role_id, menu_id);
    if (!data) {
      return res.status(404).json(error("Role menu access tidak ditemukan", 404));
    }

    return res.status(200).json(success(data, "delete"));
  } catch (err) {
    console.error("Error deleting role_menu_access:", err.message);
    return res.status(500).json(error("Gagal hapus role menu access"));
  }
};


export const getAllMenus = async (req, res) => {
    try {
        const menus = await getMenus();
        return res.status(200).json(success(menus, "get"));
    } catch (err) {
        console.error("Error fetching menus:", err.message);
        return res.status(500).json(error("Terjadi kesalahan server"));
    }
};

export const getMenu = async (req, res) => {
    try {
        const { id } = req.params;

        const menu = await getMenuById(id);
        if (!menu) {
            return res.status(404).json(error("Menu tidak ditemukan", 404));
        }

        return res.status(200).json(success(menu, "get"));
    } catch (err) {
        console.error("Error fetching menu:", err.message);
        return res.status(500).json(error("Terjadi kesalahan server"));
    }
};

export const createMenu = async (req, res) => {
    try {
        const { name, code, parent_id } = req.body;

        if (!name || !code) {
            return res.status(400).json(invalidParameter("Name & code wajib diisi"));
        }

        let level = 0;
        if (parent_id) {
            const parent = await getMenuById(parent_id);
            if (!parent) {
                return res.status(400).json(invalidParameter("Parent menu tidak ditemukan"));
            }
            level = parent.level + 1;
        }

        const menu = await createMenuModel(name, code, parent_id, level);

        return res.status(201).json(success(menu, "post"));
    } catch (err) {
        console.error("Error creating menu:", err.message);

        if (err.code === "23505") {
            return res.status(400).json(error("Code menu sudah digunakan", 400));
        }

        return res.status(500).json(error("Terjadi kesalahan server"));
    }
};

export const updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code, parent_id, level } = req.body;

        const menu = await updateMenuModel(id, { name, code, parent_id, level });
        if (!menu) {
            return res.status(404).json(error("Menu tidak ditemukan", 404));
        }

        return res.status(200).json(success(menu, "put"));
    } catch (err) {
        console.error("Error updating menu:", err.message);

        if (err.code === "23505") {
            return res.status(400).json(error("Code menu sudah digunakan", 400));
        }

        return res.status(500).json(error("Terjadi kesalahan server"));
    }
};

export const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;

        const menu = await deleteMenuModel(id);
        if (!menu) {
            return res.status(404).json(error("Menu tidak ditemukan", 404));
        }

        return res.status(200).json(success(menu, "delete"));
    } catch (err) {
        console.error("Error deleting menu:", err.message);
        return res.status(500).json(error("Terjadi kesalahan server"));
    }
};

export const getAllRoles = async (req, res) => {
  try {
    const roles = await getRoles();
    return res.status(200).json(success(roles, "get"));
  } catch (err) {
    console.error("Error fetching roles:", err.message);
    return res.status(500).json(error("Terjadi kesalahan server"));
  }
};

export const getRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await getRoleById(id);

    if (!role) {
      return res.status(404).json(error("Role tidak ditemukan", 404));
    }

    return res.status(200).json(success(role, "get"));
  } catch (err) {
    console.error("Error fetching role:", err.message);
    return res.status(500).json(error("Terjadi kesalahan server"));
  }
};

export const createRole = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json(invalidParameter("Name & code wajib diisi"));
    }

    const role = await createRoleModel(name, code);
    return res.status(201).json(success(role, "post"));
  } catch (err) {
    console.error("Error creating role:", err.message);

    if (err.code === "23505") {
      return res.status(400).json(error("Code role sudah digunakan", 400));
    }

    return res.status(500).json(error("Terjadi kesalahan server"));
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code } = req.body;

    const role = await updateRoleModel(id, { name, code });
    if (!role) {
      return res.status(404).json(error("Role tidak ditemukan", 404));
    }

    return res.status(200).json(success(role, "put"));
  } catch (err) {
    console.error("Error updating role:", err.message);

    if (err.code === "23505") {
      return res.status(400).json(error("Code role sudah digunakan", 400));
    }

    return res.status(500).json(error("Terjadi kesalahan server"));
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await deleteRoleModel(id);
    if (!role) {
      return res.status(404).json(error("Role tidak ditemukan", 404));
    }

    return res.status(200).json(success(role, "delete"));
  } catch (err) {
    console.error("Error deleting role:", err.message);
    return res.status(500).json(error("Terjadi kesalahan server"));
  }
};

export const assignRole = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;

    if (!user_id || !role_id) {
      return res.status(400).json(invalidParameter("user_id dan role_id wajib diisi"));
    }

    const data = await assignRoleToUser(user_id, role_id);
    return res.status(201).json(success(data, "post"));
  } catch (err) {
    console.error("Error assigning role:", err.message);
    return res.status(500).json(error("Gagal assign role ke user"));
  }
};

export const getUserRoles = async (req, res) => {
  try {
    const { user_id } = req.params;

    const data = await getRolesByUserId(user_id);
    return res.status(200).json(success(data, "get"));
  } catch (err) {
    console.error("Error fetching user roles:", err.message);
    return res.status(500).json(error("Gagal mengambil role user"));
  }
};

export const getRoleUsers = async (req, res) => {
  try {
    const { role_id } = req.params;

    const data = await getUsersByRoleId(role_id);
    return res.status(200).json(success(data, "get"));
  } catch (err) {
    console.error("Error fetching role users:", err.message);
    return res.status(500).json(error("Gagal mengambil user berdasarkan role"));
  }
};

export const removeRole = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;

    if (!user_id || !role_id) {
      return res.status(400).json(invalidParameter("user_id dan role_id wajib diisi"));
    }

    const data = await removeRoleFromUser(user_id, role_id);
    if (!data) {
      return res.status(404).json(error("Role untuk user ini tidak ditemukan", 404));
    }

    return res.status(200).json(success(data, "delete"));
  } catch (err) {
    console.error("Error removing role:", err.message);
    return res.status(500).json(error("Gagal menghapus role user"));
  }
};

export const clearUserRoles = async (req, res) => {
  try {
    const { user_id } = req.params;

    const data = await deleteUserRoles(user_id);
    return res.status(200).json(success(data, "delete"));
  } catch (err) {
    console.error("Error clearing user roles:", err.message);
    return res.status(500).json(error("Gagal menghapus semua role user"));
  }
};
