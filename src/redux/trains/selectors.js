import { createSelector } from "@reduxjs/toolkit";

export const selectTrains = state => state.trains.trains;
export const selectIsLoading = state => state.trains.isLoading;
export const selectIsError = state => state.trains.isError;
export const selectCurrentTrain = state => state.trains.currentTrain;
export const selectBoughtTikets = state => state.trains.boughtTikets;
export const selectFilters = state => state.trains.filters;

export const selectFilteredTrains = createSelector(
  [selectTrains, selectFilters],
  (trains, filters) => {
    return trains.filter(t => {
      const matchDeparture = filters.departure
        ? t.departure_station.toLowerCase().includes(filters.departure.toLowerCase())
        : true;

      const matchArrival = filters.arrival
        ? t.arrival_station.toLowerCase().includes(filters.arrival.toLowerCase())
        : true;

      const matchSeats = t.seats_available >= (filters.minSeats || 0);

      const matchPrice = filters.maxPrice
        ? t.price <= filters.maxPrice
        : true;

      return matchDeparture && matchArrival && matchSeats && matchPrice;
    });
  }
);