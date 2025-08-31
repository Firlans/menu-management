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
  createMenu,
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
} from "../controller/appController.js";

const router = express.Router();
import { authMiddleware } from "../middleware/auth.js";
router.get("/", (req, res) => {
  res.send("Server is running");
});

router.post("/user", createUser);
router.post("/login", login);
router.put("/user/:id", authMiddleware, updateUser); // proteksi route
router.delete("/user/:id", authMiddleware, deleteUser);
// router.get("/dashboard", login);
// router.post("/logout", login);

router.get("/menu", getAllMenus);
router.get("/menu/:id", getMenu);
router.post("/menu", createMenu);
router.put("/menu/:id", updateMenu);
router.delete("/menu/:id", deleteMenu);

router.get("/role", getAllRoles);
router.get("/role/:id", getRole);
router.post("/role", createRole);
router.put("/role/:id", updateRole);
router.delete("/role/:id", deleteRole);

router.post("/user-role", assignRole);
router.get("/user-role/:user_id", getUserRoles);
router.get("/role-users/:role_id", getRoleUsers);   
router.delete("/user-role", removeRole);
router.delete("/user-role/clear/:user_id", clearUserRoles);

router.post("/role-menu-access", createRoleMenuAccess);
router.get("/role-menu-access/:role_id", getRoleMenuAccess);
router.put("/role-menu-access", updateRoleMenuAccess);
router.delete("/role-menu-access", deleteRoleMenuAccess);

export default router;
