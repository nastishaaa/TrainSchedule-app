import { RootState } from "../store";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Train } from "../../types";

export const getTrains = createAsyncThunk<
    Train[],
    void,
    { rejectValue: string } 
>(
    'trains/getTrains',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get('https://trainschedule-app-server.onrender.com/trains');

            return res.data.data.trains as Train[];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getTrainById = createAsyncThunk<
    Train,
    number,
    { rejectValue: string } 
>(
    'trains/getTrainById',
    async (id, thunkAPI) => {
        try {
            const res = await axios.get(`https://trainschedule-app-server.onrender.com/trains/${id}`);

            return res.data.data as Train;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const buyTiket = createAsyncThunk<
    Train,
    number,
    { state: RootState; rejectValue: string } 
>(
    'trains/buyTiket',
    async (id, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.auth.token;
        
        try {
            await axios.patch(`https://trainschedule-app-server.onrender.com/trains/buy/${id}`,
                {},
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const res = await axios.get(`https://trainschedule-app-server.onrender.com/trains/${id}`);

            return res.data.data as Train;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
