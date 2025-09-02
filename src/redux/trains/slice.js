import { createSlice } from "@reduxjs/toolkit";
import { getTrainById, getTrains } from "./operations";

const initialState = {
    trains: [],
    currentTrain: null,
    isLoading: false,
    isError: false,
}

const trainsSlice = createSlice({
    name: 'trains',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getTrains.pending, state => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getTrains.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.trains = action.payload;
            })
            .addCase(getTrains.rejected, state => {
                state.isError = true;
                state.isLoading = false;
            })
            .addCase(getTrainById.pending, state => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getTrainById.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.currentTrain = action.payload;
            })
            .addCase(getTrainById.rejected, state => {
                state.isError = true;
                state.isLoading = false;
            })
    }
});

export default trainsSlice.reducer;