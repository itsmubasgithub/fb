import axios from "axios";

const base_url = "http://localhost:3001/user/api";

export const registerUser = async (userData) => {
  const response = await axios.post(`${base_url}/register`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${base_url}/entered`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const verifyOtpSer = async (otpData) => {
  const response = await axios.post(
    `${base_url}/verify-otp/${otpData.user_id}`,
    otpData
  );

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getAllData = async () => {
  const response = await axios.get(`${base_url}/get-all-users/`);
  return response.data;
};
