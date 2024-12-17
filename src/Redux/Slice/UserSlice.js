import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosInterceptors";

const initialState = {
    userList: [],
    isSuccessMsg: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    isErrorMessage: "",
    deleteMessage: "",
    edit: {
        userData: {},
        isEdit: false,
    }
}
const userDataSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        editUser: (state, action) => {
            return {
                ...state,
                edit: {
                    userData: action.payload,
                    isEdit: true
                }
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.isErrorMessage = "";
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true
                state.isError = false;
                state.userList = action.payload;
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false
                state.isError = true;
                state.isErrorMessage = action.payload || "Failed to fetch users"
            })

            .addCase(deleteUser.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.isErrorMessage = ""
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true
                state.isError = false;
                state.isSuccessMsg = true;
                state.deleteMessage = action.payload
                // state.userList = state.userList.filter(user => user.id !== action.payload)

            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false
                state.isError = true;
                state.isErrorMessage = action.payload;
            })

            .addCase(updateUser.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.isErrorMessage = ""
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true
                state.isError = false;
                state.isSuccessMsg = true;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false
                state.isError = true;
                state.isErrorMessage = action.payload.data;
            })
    }
})


export default userDataSlice.reducer


export const getAllUser = createAsyncThunk(
    "USER/GETALL",
    async () => {
        try {
            const response = await axiosInstance.get("/user?pageNumber=1&pageSize=100");
            console.log(response, "user data")
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteUser = createAsyncThunk(
    "USER/DELETE",
    async (id) => {
        try {
            const response = await axiosInstance.delete(`/user/${id}`)
            // alert("user delete successfully")
            // console.log(response.data.message, "delete data")
            return response.data.message
        } catch (error) {
            console.log(error)
        }
    }
)


export const updateUser = createAsyncThunk(
    "USER/UPDATE",
    async (update) => {
        const { id, name, email, password } = update
        try {
            const response = await axiosInstance.put(`/user/${id}`, {
                name: name, email: email, password: password
            })
            toast.success("Update user successfully", {
                position: "top-right",
                autoClose:1000
            });
            // console.log(response, "update user successfully")
            return response.data
        } catch (error) {
            toast.error("Failed", {
                position: "top-right",
                autoClose:1000
            });
            console.log("failed to update", error)
        }
    }
)
export const { editUser } = userDataSlice.actions