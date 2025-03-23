import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInterceptors";
import { toast } from "react-toastify";
const initialState={
    isLoading: false,
    isSuccess: false,
    isError: false,
    isErrorMessage: "",
    ProductData:{}
}

const CategoryData=createSlice({
    name:"category",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getCategory.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.isErrorMessage = "";
              })
        
              .addCase(getCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.productData=action.payload
              })
              .addCase(getCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = action.payload; 
                state.isErrorMessage = action.payload || "login failed"
              })

              .addCase(createCategory.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.isErrorMessage = "";
              })
        
              .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.newProductData=action.payload
              })
              .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = action.payload; 
                state.isErrorMessage = action.payload || "login failed"
              })
    }
})
export default CategoryData.reducer


export const getCategory = createAsyncThunk(
    "CETEGORY/GETALL",
    async () => {
        try {
            const response = await axiosInstance.get("/category?pageNumber=1&pageSize=100");
            console.log(response.data.data, "category data")
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const createCategory=createAsyncThunk(
    "CETEGORY/CREATE",
    async(formData)=>{
        try{
            const response=await axiosInstance.post("/product",formData)
            // console.log(response,"created data") 
            toast.success("Product created successfully", {
              position: "top-right",
              autoClose:1000  
          });
          return response.data.data
        }catch(error){
            console.log(error)
        }
    }
)

