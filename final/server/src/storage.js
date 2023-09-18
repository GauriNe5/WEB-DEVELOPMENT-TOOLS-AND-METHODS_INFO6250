"use strict";

const storage = {
  sessions: {}, // {sessionId: userId}
  user: {
    1: {
      username: "admin",
      postId: [1],
      commentId: [],
      isAdmin: true,
      isBanned: false,
    },
    2: {
      username: "dog",
      postId: [],
      commentId: [],
      isAdmin: false,
      isBanned: true,
    },
  }, // {userId: {name, postId, commentId}}
  post: {
    1: {
      userId: "1",
      title: "New Model Tesla",
      content: "Lastest model in the showroom",
      cover: "https://cdn.jdpower.com/jdp_2022%20tesla%20model%203%20red%20front%20quarter%20view.jpg",
      createDate: new Date("2023-04-03"),
    },
  }, // {postId: userId, title, content, cover}
  commentForPost: {
    1: {
      1: {
        content: "Hi there!",
        userId: "1",
        createDate: new Date("2023-04-03"),
      },
    },
  }, // {postId: {commentId: content, userId}}
};

module.exports = storage;
