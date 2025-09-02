import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
    'auth/register',
    async (body, thunkAPI) => {
        try {
            const res = await axios.post('https://trainschedule-app-server.onrender.com/auth/register', body);
            console.log(res.data);
            
            setAuthHeader(res.data.token);

            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login', 
    async (body, thunkAPI) => {
        try {
            const res = await axios.post('https://trainschedule-app-server.onrender.com/auth/login', body);
            console.log(res.data);
            
            setAuthHeader(res.data.data.accessToken);
            return { user: res.data.data.user, token: res.data.data.accessToken };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await axios.post('https://trainschedule-app-server.onrender.com/auth/logout');
            clearAuthHeader();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
            
        }
    }
);
