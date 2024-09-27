import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  loginData: {},
  token: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  emailVerificationSuccess: false,
  isErrorMessage: "",
  signupData: {}
}

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.isErrorMessage = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.loginData = action.payload;
        state.token = action.payload?.token
        localStorage.setItem("token", action.payload?.token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false
        state.isError = true;
        state.isErrorMessage = action.payload || "login failed"
      })

      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.isErrorMessage = ""
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.signupData = action.payload;
        state.token = action.payload?.emailVerificationTOken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isErrorMessage = action.payload || "registration failed"
      })

      .addCase(verifyEmail.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.isErrorMessage = "";
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.emailVerificationSuccess = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isErrorMessage = action.payload || "Email verification failed";
      })

      .addCase(forgotPassword.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.isErrorMessage = "";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isErrorMessage = action.payload;
      })

      .addCase(resetPassword.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.isErrorMessage = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isErrorMessage = action.payload || "password reset failed";
      })

      .addCase(googleLogin.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.isErrorMessage = "";
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.loginData = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload?.token);

      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isErrorMessage = action.payload || "password reset failed";
      });
  },
});

export default loginSlice.reducer;

export const loginUser = createAsyncThunk(
  "LOGIN/USER",
  async (user) => {
    try {
      const response = await axios.post("https://node-js-wse4.onrender.com/user/login", user);
      // console.log(response.data.data, "login response")
      return response.data.data
    } catch (error) {
      // console.log(error)
      return (error.response.data.message, "login failed")
    }
  }
)


export const registerUser = createAsyncThunk(
  "REGISTER/USER",
  async (user) => {
    try {
      const response = await axios.post("https://node-js-wse4.onrender.com/user", user);
      return response.data.data
      // console.log(response)
    } catch (error) {
      // console.log(error)
      return (error.response.data.message, "registration failed")
    }
  }
)

export const verifyEmail = createAsyncThunk(
  "VERIFY/USER",
  async (verification) => {
    const { id, token } = verification
    try {
      const response = await axios.get(`https://node-js-wse4.onrender.com/user/email/verification?token=${token}&userId=${id}`);
      // console.log(response, "verification response")
      return response.data.data
    } catch (error) {
      console.log("Email verification failed")
    }
  }
)


export const forgotPassword = createAsyncThunk(
  "FORGOT/PASSWORD",
  async (email) => {
    try {
      const response = await axios.post(`https://node-js-wse4.onrender.com/user/forgot-password`, email)
      toast.success("Password reset link has been sent to your account", {
        position: "top-right",
      });
      // console.log(response.data.message)
      return response.data.message
    } catch {
      toast.error("Request failed. Please try again", {
        position: "top-right"
      });
      console.log("Failed to send password reset email")
    }
  }
)

export const resetPassword = createAsyncThunk(
  "RESET/PASSWORD",
  async (reset) => {

    try {
      const response = await axios.post(`https://node-js-wse4.onrender.com/user/reset-password`, reset)
      // console.log(response)
      return response.data.message
    } catch {
      console.log("Password reset failed")
    }
  }
)

export const googleLogin = createAsyncThunk(
  "GOOGLE/LOGIN",
  async (credential) => {
    try {
      const response = await axios.post("https://node-js-wse4.onrender.com/user/google-login", credential)
      // console.log(response,"google login data")
      return response.data.data
    } catch (error) {
      console.log(error)
    }
  }
)