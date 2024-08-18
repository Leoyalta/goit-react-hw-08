import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://connections-api.goit.global/";

axios.defaults.baseURL = baseUrl;
export default baseUrl;

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", newUser);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// LogIn user
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// LogOut user
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    setAuthHeader("");
  } catch (error) {
    setAuthHeader("");
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

//  Refresh user
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    console.log("Refresh user");
    const { auth } = thunkAPI.getState();
    setAuthHeader(auth.token);

    try {
      const response = await axios.get("/users/current");
      if (response.data.token) {
        setAuthHeader(response.data.token);
      }
      return response.data;
    } catch (error) {
      axios.defaults.headers.common.Authorization = "";
      thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const { auth } = thunkAPI.getState();
      console.log("Condition!");
      return auth.token !== null;
    },
  }
);
