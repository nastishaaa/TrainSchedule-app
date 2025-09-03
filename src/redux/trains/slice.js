import { createSlice } from "@reduxjs/toolkit";
import { buyTiket, getTrainById, getTrains } from "./operations";

const initialState = {
    trains: [],
    boughtTikets: [],
    filters: {
        departure: '',
        arrival: '',
        minSeats: 0,
        maxPrice: null,
    },
    currentTrain: null,
    isLoading: false,
    isError: false,
}

const trainsSlice = createSlice({
    name: 'trains',
    initialState,
    reducers: {
        addBoughtTicket: (state, action) => {
            state.boughtTikets.push(action.payload);
        },
        removeBoughtTicket: (state, action) => {
            state.boughtTikets = state.boughtTikets.filter(t => t.id !== action.payload);
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
    }
    },
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
            .addCase(buyTiket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(buyTiket.fulfilled, (state, action) => {
                state.boughtTikets.push(action.payload);
                state.isLoading = false;
            })
    }
});

export const { addBoughtTicket, removeBoughtTicket, setFilters } = trainsSlice.actions;

export default trainsSlice.reducer;