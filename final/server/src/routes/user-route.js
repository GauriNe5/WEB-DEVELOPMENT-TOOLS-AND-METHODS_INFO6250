"use strict";
const express = require("express");
const { getSession, login, logout, register } = require("../controller/user");
const { requireAuth } = require("../middleware/requireAuth");

const route = express.Router();

route.get("/api/v1/user", requireAuth, getSession); // Get current session
route.post("/api/v1/user", login); // Log in
route.put("/api/v1/user", register); // Create new user
route.delete("/api/v1/user", logout);

module.exports = route;
