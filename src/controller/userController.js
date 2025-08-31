import bcrypt from "bcrypt";
import {
    getUserByEmail,
    createUser as createUserModel,
    updateUser as updateUserModel,
    deleteUser as deleteUserModel,
} from "../models/userModel.js";

import { success, error, invalidParameter } from "../utils/response.js";
import { getToken } from "../config/jwt.js";

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json(invalidParameter("Username, email, dan password wajib diisi"));
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json(invalidParameter("Email sudah digunakan"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUserModel(username, email, hashedPassword);

        return res.status(201).json(success(user, "post"));
    } catch (err) {
        console.error("Error creating user:", err.message);
        return res.status(500).json(error("Terjadi kesalahan server"));
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(invalidParameter("Email & password wajib diisi"));
        }

        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json(error("Email atau password salah", 401));
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json(error("Email atau password salah", 401));
        }

        // 🔑 generate token dari helper
        const token = getToken({ id: user.id, email: user.email });

        return res.status(200).json(success({
            id: user.id,
            username: user.username,
            email: user.email,
            token
        }, "get"));
    } catch (err) {
        console.error("Error login:", err.message);
        return res.status(500).json(error("Terjadi kesalahan server"));
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const user = await updateUserModel(id, { username, email, password: hashedPassword });

        if (!user) {
            return res.status(404).json(error("User tidak ditemukan", 404));
        }

        return res.status(200).json(success(user, "put"));
    } catch (err) {
        console.error("Error updating user:", err.message);
        return res.status(500).json(error("Terjadi kesalahan server"));
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await deleteUserModel(id);

        if (!user) {
            return res.status(404).json(error("User tidak ditemukan", 404));
        }

        return res.status(200).json(success(user, "delete"));
    } catch (err) {
        console.error("Error deleting user:", err.message);
        return res.status(500).json(error("Terjadi kesalahan server"));
    }
};
