import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Train } from "../../types";


export const selectTrains = (state: RootState): Train[] => state.trains.trains;
export const selectIsLoading = (state: RootState): boolean => state.trains.isLoading;
export const selectIsError = (state: RootState): boolean => state.trains.isError;
export const selectCurrentTrain = (state: RootState): Train | null => state.trains.currentTrain;
export const selectBoughtTikets = (state: RootState): Train[] => state.trains.boughtTikets;
export const selectFilters = (state: RootState): RootState["trains"]["filters"] => state.trains.filters;

export const selectFilteredTrains = createSelector(
  [selectTrains, selectFilters],
  (trains: Train[], filters) => {
    return trains.filter(t => {
      const matchDeparture = filters.departure
        ? t.departure_station.toLowerCase().includes(filters.departure.toLowerCase())
        : true;

      const matchArrival = filters.arrival
        ? t.arrival_station.toLowerCase().includes(filters.arrival.toLowerCase())
        : true;

      const matchSeats = t.seats_available >= (filters.minSeats || 0);

      const matchPrice = filters.maxPrice
        ? parseFloat(t.price) <= filters.maxPrice
        : true;

      return matchDeparture && matchArrival && matchSeats && matchPrice;
    });
  }
);
