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
    // Kirim permintaan GET dengan email sebagai parameter
    const response = await userApi.checkEmailAvailability(email);
    console.log("Response from server:", response.data);

    // Periksa apakah email tersedia atau tidak
    return response.data.available;
  } catch (error) {
    console.error("Error checking email:", error);
    throw error;
  }
});

export const loginUser = createAsyncThunk(
  "user/userLoginStatus",
  async (credentials) => {
    try {
      // Lakukan validasi email dan kata sandi di sini
      const response = await userApi.login(credentials);

      if (response.data && response.data.length > 0) {
        // Jika email dan kata sandi benar, kembalikan data pengguna
        const userData = {
          id: response.data[0].id,
          name: response.data[0].name,
          username: response.data[0].username,
          email: response.data[0].email,
        };
        return userData;
      } else {
        // Jika email atau kata sandi salah, lempar error
        throw new Error("Email atau kata sandi salah.");
      }
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  user: null,
  registrationError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("Registrasi berhasil:", action.payload);
        state.user = action.payload;
        state.registrationError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("Registrasi gagal", action.error);
        state.user = null;
        state.registrationError = action.error.message;
      })
      .addCase(checkEmail.rejected, (state, action) => {
        console.log("Kesalahan memeriksa email", action.error);
      });
  },
});

export default userSlice.reducer;
