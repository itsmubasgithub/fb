import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllData,
  loginUser,
  logout,
  registerUser,
  verifyOtpSer,
} from "./userService";

// check the userfrom the local storage
const checkUser = JSON.parse(localStorage.getItem("user"));

// two parts

const initialState = {
  user: checkUser ? checkUser : null,
  userLoading: false,
  userSuccess: false,
  userError: false,
  userMessage: "",
  allUsers: [],
};

// get the function from the service
export const registerUserData = createAsyncThunk(
  "register",
  async (userData, thunkAPI) => {
    try {
      return await registerUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const loginUserData = createAsyncThunk(
  "log-user",
  async (userData, thunkAPI) => {
    try {
      return await loginUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logout-user",
  async (_, thunkAPI) => {
    try {
      return await logout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const verifyOtpData = createAsyncThunk(
  "verify-otp",
  async (otpData, thunkAPI) => {
    try {
      return await verifyOtpSer(otpData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getAllUsersData = createAsyncThunk(
  "get-all-users",
  async (_, thunkAPI) => {
    try {
      return getAllData();
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);
// second part

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userReset: (state) => {
      state.userLoading = false;
      state.userError = false;
      state.userSuccess = false;
      state.userMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserData.pending, (state, action) => {
        state.userLoading = true;
      })

      .addCase(registerUserData.rejected, (state, action) => {
        state.userError = true;
        state.userLoading = false;
        state.userMessage = action.payload;
        state.user = null;
      })
      .addCase(registerUserData.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.user = action.payload;
      })

      .addCase(logoutUser.pending, (state, action) => {
        state.userLoading = true;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.userError = true;
        state.userLoading = false;
        state.userMessage = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.user = null;
      })

      .addCase(loginUserData.pending, (state, action) => {
        state.userLoading = true;
      })

      .addCase(loginUserData.rejected, (state, action) => {
        state.userError = true;
        state.userLoading = false;
        state.userMessage = action.payload;
        state.user = null;
      })
      .addCase(loginUserData.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.user = action.payload;
      })

      .addCase(verifyOtpData.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(verifyOtpData.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
      })
      .addCase(verifyOtpData.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userError = false;
        state.userSuccess = true;
        state.user = action.payload;
      })
      .addCase(getAllUsersData.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(getAllUsersData.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
      })
      .addCase(getAllUsersData.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userError = false;
        state.userSuccess = true;
        state.allUsers = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { userReset } = userSlice.actions;
