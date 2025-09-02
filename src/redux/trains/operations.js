import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTrains = createAsyncThunk(
    'trains/getTrains',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get('https://trainschedule-app-server.onrender.com/trains');

            return res.data.data.trains;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getTrainById = createAsyncThunk(
    'trains/getTrainById',
    async (id, thunkAPI) => {
        try {
            const res = await axios.get(`https://trainschedule-app-server.onrender.com/trains/${id}`);

            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
