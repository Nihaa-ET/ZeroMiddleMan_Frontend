import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import sellerReducer from './sellerSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
    },
});
