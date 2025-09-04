import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./operations";
import type { User } from "../../types/index";

export interface initialAuthData {
    user: User
    isLoggedIn: boolean,
    token: string | null,
}

const initialState = {
    user: {
        name: '',
        email: '',
    },
    isLoggedIn: false,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoggedIn = true;
                state.token = action.payload.token;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })
            .addCase(logout.fulfilled, () => initialState )
    }
});

export default authSlice.reducer;