import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const HOST = "https://test.v5.pryaniky.com";
const LOGIN_URL = `${HOST}/ru/data/v3/testmethods/docs/login`;

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(LOGIN_URL, { username, password });
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      console.error("Ошибка при авторизации:", error);
      return thunkAPI.rejectWithValue("Ошибка авторизации");
    }
  }
);

interface UserState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
