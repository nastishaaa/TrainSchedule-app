export type Train = {
    id: number; 
    number: string;
    name: string;
    departure_station: string;
    arrival_station: string;
    departure_time: string;
    arrival_time: string;  
    travel_duration: {
        minutes: number;
        seconds: number;
    };
    seats_available: number;
    price: string; 
    created_at: string; 
    updated_at: string; 
}

export type User = {
    name: string, 
    email: string,
}