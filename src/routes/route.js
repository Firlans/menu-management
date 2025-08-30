"use strict";

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server is running");
});
// router.post("/login", login);
// router.get("/dashboard", login);
// router.get("/menu", login);
// router.post("/menu", login);
// router.put("/menu/:id", login);

export default router;
