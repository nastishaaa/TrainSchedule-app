import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginFormValues } from "../../components/LoginForm/LoginForm";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    // додай інші поля, які приходять від API
}

const setAuthHeader = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk<
    { user: User; token: string },  
    RegisterFormValues,             
    { rejectValue: string }          
>(
    'auth/register',
    async (body, thunkAPI) => {
        try {
            const res = await axios.post('https://trainschedule-app-server.onrender.com/auth/register', body);
            
            setAuthHeader(res.data.data.accessToken);

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
    { user: User; token: string },
    LoginFormValues,
    { rejectValue: string }
>(
    'auth/login',
    async (body, thunkAPI) => {
        try {
            const res = await axios.post('https://trainschedule-app-server.onrender.com/auth/login', body);
            
            setAuthHeader(res.data.data.accessToken);

            return {
                user: res.data.data.user,
                token: res.data.data.accessToken
            };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk<
    void,                   
    void,                  
    { rejectValue: string } 
>(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await axios.post('https://trainschedule-app-server.onrender.com/auth/logout');
            clearAuthHeader();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
