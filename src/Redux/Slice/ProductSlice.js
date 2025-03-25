import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInterceptors";
const initialState={
    isLoading:"false",
    isSuccess:"false",
    isError:"false",
    AllProduct:[]
}

const Product=createSlice({
name:"product",
initialState,
reducers:{},
extraReducers:(builder)=>{
    builder
    .addCase(GetAllProduct.pending, (state, action) => {
                    state.isLoading = true;
                    state.isSuccess = false;
                    state.isError = false;
                    state.isErrorMessage = "";
                  })
            
                  .addCase(GetAllProduct.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.AllProduct=action.payload
                  })
                  .addCase(GetAllProduct.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError = action.payload; 
                    state.isErrorMessage = action.payload || "login failed"
                  })
}
})
export default Product.reducer



export const GetAllProduct=createAsyncThunk(
    "PRODUCT/GETALL",
    async()=>{
        try{
            const response=await axiosInstance("/product?pageNumber=1&pageSize=100")
            console.log(response,"all productssss")
             return response.data.data 
        }catch(error){
            console.log(Error)
        }
    }
)