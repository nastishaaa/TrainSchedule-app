import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterFormValues } from "../../components/RegisterForm/RegisterForm";
import { LoginFormValues } from "../../components/LoginForm/LoginForm";

const setAuthHeader = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk<
    { user: any; token: string },
    RegisterFormValues,          
    { rejectValue: string }>
    (
    'auth/register',
    async (body, thunkAPI) => {
        try {
            const res = await axios.post('https://trainschedule-app-server.onrender.com/auth/register', body);
            
            setAuthHeader(res.data.token);

            return {
                user: res.data.data.user,
                token: res.data.data.accessToken,
            };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk<
    { user: any; token: string },
    LoginFormValues,          
    { rejectValue: string }>(
    'auth/login', 
    async (body, thunkAPI) => {
        try {
            const res = await axios.post('https://trainschedule-app-server.onrender.com/auth/login', body);
            console.log(res.data);
            
            setAuthHeader(res.data.data.accessToken);
            return { user: res.data.data.user, token: res.data.data.accessToken };
        } catch (error : any) {
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
        } catch (error : any) {
            return thunkAPI.rejectWithValue(error.message);
            
        }
    }
);
