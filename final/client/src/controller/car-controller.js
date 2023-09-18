/**
 *
 * @returns {Promise} 
 */
export function fetchPost() {
  // Fetch Post
  return fetch("/api/v1/post")
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
 * @param {Object} updateField 
 * @returns
 */
export function updatePost(postId, updateField) {
  const queryBody = { postId, ...updateField };
  return fetch("/api/v1/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(queryBody),
  })
    .catch((error) => Promise.reject(error))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          return Promise.reject(error);
        });
      }
      return response.json();
    });
}

/**
 
 * @param {String} postId 
 * @returns 
 */
export function deletePost(postId) {
  const queryBody = { postId };
  return fetch("/api/v1/post", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(queryBody),
  })
    .catch((error) => {
      return Promise.reject(error);
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          return Promise.reject(error);
        });
      }
      return response.json();
    });
}

/**
 * 
 * @param {Object} body 
 * @returns 
 */
export function createPost(body) {
  return fetch("/api/v1/post", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .catch((error) => Promise.reject(error))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          return Promise.reject(error);
        });
      }
      return response.json();
    });
}
