"use strict";
const storage = require("../storage");
const { getRandomID } = require("./common");
const { getSessionUserId } = require("./user-utils");

function getPost(req, res) {
  const ret = Object.keys(storage.post).map((postId) => {
    const username = storage.user[storage.post[postId].userId].username;
    return { postId, username, ...storage.post[postId] };
  });
  ret.sort((a, b) => b.createDate - a.createDate);
  res.json(ret);
}
function addPost(req, res) {
  const sid = req.cookies.sid;
  const userId = getSessionUserId(sid);

  const postId = getRandomID(5);

  const title = req.body.title;
  const content = req.body.content;
  const cover = req.body.cover;

  if (!title || !content) {
    res.status(400).json({ error: "invalid-input" });
  }

  storage.post[postId] = {
    userId,
    title,
    content,
    cover, 
    createDate: new Date(),
  };

  storage.commentForPost[postId] = [];
  res.json({
    postId,
    username: storage.user[userId].username,
    ...storage.post[postId],
  });
}

function updatePost(req, res) {
  const sid = req.cookies.sid;
  const userId = getSessionUserId(sid);

  const postId = req.body.postId;

  // Check if the post exist
  if (!Object.keys(storage.post).includes(postId)) {
    res.status(400).json({ error: "invalid-postId" });
  }

  const title = req.body.title || storage.post[postId].title;
  const content = req.body.content || storage.post[postId].content;
  const cover = req.body.cover || storage.post[postId].cover;

 
  if (
    userId != storage.post[postId].userId &&
    !storage.user[userId]?.isAdmin &&
    Object.keys(req.body).length != 2
    
  ) {
    res.status(401).json({ error: "permission-denied" });
    return;
  }

  storage.post[postId] = {
    ...storage.post[postId],
    title,
    content,
    cover,
    
  };

  res.json({ postId, ...storage.post[postId] });
}

function deletePost(req, res) {
  const sid = req.cookies.sid;
  const userId = getSessionUserId(sid);

  const postId = req.body.postId;

  // Check if the post exist
  if (!Object.keys(storage.post).includes(postId)) {
    res.status(400).json({ error: "invalid-postId" });
  }

  if (userId != storage.post[postId].userId && !storage.user[userId]?.isAdmin) {
    res.status(401).json({ error: "permission-denied" });
    return;
  }

  delete storage.post[postId];
  delete storage.commentForPost[postId];

  res.json({ postId });
}

module.exports = { getPost, addPost, updatePost, deletePost };
