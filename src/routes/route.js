import express from "express";
import {
  createUser,
  login,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import {
  getAllMenus,
  getMenu,
  createMenus,
  updateMenu,
  deleteMenu,
  getAllRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
  assignRole,
  getUserRoles,
  getRoleUsers,
  removeRole,
  clearUserRoles,
  createRoleMenuAccess,
  getRoleMenuAccess,
  updateRoleMenuAccess,
  deleteRoleMenuAccess,
  getDashboard
} from "../controller/appController.js";

const router = express.Router();
import { authMiddleware } from "../middleware/auth.js";
router.get("/", (req, res) => {
  res.send("Server is running");
});

router.post("/user", authMiddleware, createUser);
router.post("/login", login);
router.put("/user/:id", authMiddleware, updateUser); // proteksi route
router.delete("/user/:id", authMiddleware, deleteUser);
router.get("/dashboard", authMiddleware, getDashboard);
// router.post("/logout", logout);

router.get("/menu", authMiddleware, getAllMenus);
router.get("/menu/:id", authMiddleware, getMenu);
router.post("/menu", authMiddleware, createMenus);
router.put("/menu/:id", authMiddleware, updateMenu);
router.delete("/menu/:id", authMiddleware, deleteMenu);

router.get("/role", authMiddleware, getAllRoles);
router.get("/role/:id", authMiddleware, getRole);
router.post("/role", authMiddleware, createRole);
router.put("/role/:id", authMiddleware, updateRole);
router.delete("/role/:id", authMiddleware, deleteRole);

router.post("/user-role", authMiddleware, assignRole);
router.get("/user-role/:user_id", authMiddleware, getUserRoles);
router.get("/role-users/:role_id", authMiddleware, getRoleUsers);   
router.delete("/user-role", authMiddleware, removeRole);
router.delete("/user-role/clear/:user_id", authMiddleware, clearUserRoles);

router.post("/role-menu-access", authMiddleware, createRoleMenuAccess);
router.get("/role-menu-access/:role_id", authMiddleware, getRoleMenuAccess);
router.put("/role-menu-access", authMiddleware, updateRoleMenuAccess);
router.delete("/role-menu-access", authMiddleware, deleteRoleMenuAccess);

export default router;
