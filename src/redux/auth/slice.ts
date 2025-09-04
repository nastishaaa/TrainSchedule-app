import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout, register } from "./operations";
import type { User } from "../../types/index";

export interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
    token: string | null;
}

const initialState: AuthState = {
    user: {
        name: '',
        email: ''
    },
    isLoggedIn: false,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            builder
      .addCase(register.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(logout.fulfilled, () => initialState);
    }
});

export default authSlice.reducer;