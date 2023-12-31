/**
 * 
 * @param {String} postId
 * @returns An array of comment item
 */
export function fetchCommentForPost(postId) {
  return fetch(`/api/v1/post/${postId}/comment`)
    .catch((error) => Promise.reject(error))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => Promise.reject(error));
      }
      return response.json();
    });
}

/**

 * @param {String} postId 
 * @param {String} content 
 * @returns
 */
export function addCommentForPost(postId, content) {
  const queryBody = { postId, content };
  return fetch(`/api/v1/post/${postId}/comment`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(queryBody),
  })
    .catch((error) => Promise.reject(error))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => Promise.reject(error));
      }
      return response.json();
    });
}
