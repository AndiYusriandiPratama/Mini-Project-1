import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "./../api/user";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData) => {
    const response = await userApi.addUser(userData);
    return response.data;
  }
);

export const checkEmail = createAsyncThunk("user/checkEmail", async (email) => {
  try {
    const response = await userApi.checkEmailAvailability(email);
    return response; // Mengembalikan respons dari API
  } catch (error) {
    console.error("Error checking email:", error);
    throw error;
  }
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (params, { rejectWithValue }) => {
    try {
      const response = await userApi.loginUser(params);
      if (response.data && response.data.length > 0) {
        return {
          id: response.data[0].id,
          username: response.data[0].username,
          email: response.data[0].email,
        };
      } else {
        return rejectWithValue("Data pengguna tidak ditemukan");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return rejectWithValue("Username atau password salah");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    errorMessage: "",
    registrationError: null,
    isEmailAvailable: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("Registrasi berhasil:", action.payload);
        state.user = action.payload;
        state.registrationError = null;
        state.isTaken = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("Registrasi gagal", action.error);
        state.user = null;
        state.registrationError = action.error.message;
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.isEmailAvailable = action.payload;
      })
      .addCase(checkEmail.rejected, (state, action) => {
        state.isEmailAvailable = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export default userSlice.reducer;
