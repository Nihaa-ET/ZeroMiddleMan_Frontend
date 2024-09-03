import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  seller : null
}

export const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
     setSellerDetail : (state, action)=>{
         state.seller = action.payload
         console.log("user-details",action.payload);
     } 
  },
})

// Action creators are generated for each case reducer function
export const { setSellerDetail } = sellerSlice.actions

export default sellerSlice.reducer