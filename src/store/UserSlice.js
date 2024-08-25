import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role: localStorage.getItem('role') || null,
    username: localStorage.getItem('username') || null, // Add username to the state
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true', // Load from local storage
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
            localStorage.setItem('role', action.payload);
        },
        setUsername: (state, action) => { // Add setUsername reducer
            state.username = action.payload;
            localStorage.setItem('username', action.payload);
        },
        clearRole: (state) => {
            state.role = null;
            localStorage.removeItem('role');
        },
        clearUsername: (state) => { // Add clearUsername reducer
            state.username = null;
            localStorage.removeItem('username');
        },
        setAuthenticated: (state) => {
            state.isAuthenticated = true;
            localStorage.setItem('isAuthenticated', 'true');
        },
        clearAuthenticated: (state) => {
            state.isAuthenticated = false;
            localStorage.setItem('isAuthenticated', 'false');
        },
    },
});

export const { setRole, clearRole, setAuthenticated, clearAuthenticated, setUsername, clearUsername } = userSlice.actions;
export default userSlice.reducer;
