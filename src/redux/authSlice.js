import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: "",
        isAuthorized: false,
        user: {},
    },
    reducers: {
        login: (state, action) => {
            state.isAuthorized = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
    },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;