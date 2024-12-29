import axios from "axios";

const base_url = "http://localhost:3001/api/posts";

export const uploadPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${base_url}/upload-post`,
    postData,
    config
  );
  return response.data;
};

export const addComment = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${base_url}/add-comment`,
    postData,
    config
  );
  return response.data;
};

export const getPosts = async () => {
  const response = await axios.get(`${base_url}/get-posts`);
  return response.data;
};
