"use strict";
const express = require("express");
const {
  getPost,
  updatePost,
  addPost,
  deletePost,
} = require("../controller/car");
const { requireAuth } = require("../middleware/requireAuth");

const route = express.Router();

route.get("/api/v1/post", requireAuth, getPost); // 
route.post("/api/v1/post", requireAuth, updatePost); // 
route.put("/api/v1/post", requireAuth, addPost); //
route.delete("/api/v1/post", requireAuth, deletePost); // 

module.exports = route;
