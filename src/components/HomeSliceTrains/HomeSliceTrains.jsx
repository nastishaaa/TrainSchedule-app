import s from './HomeSliceTrains.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { selectTrains } from '../../redux/trains/selectors';
import {getTrains} from '../../redux/trains/operations';

export default function HomeSliceTrains() {
    const trains = useSelector(selectTrains);
    const dispatch = useDispatch();

    const firstFiveTrains = Array.isArray(trains) ? trains.slice(0, 5) : [];

    useEffect(() => {
        dispatch(getTrains());
    }, [dispatch]);

    return (
        <div className={s.sliceTrainsContainer}>
            <h2 className={s.sliceTitle}>Trains you might be interested in</h2>
            
            {firstFiveTrains.map(train => (
                <div key={train.id} className={s.trainMiniCard}>
                    <div className={s.trainInfo}>
                        <span className={s.trainNumber}>{train.number}</span>
                        <span className={s.trainName}>{train.name}</span>
                        <span className={s.trainStations}>
                            {train.departure_station} → {train.arrival_station}
                        </span>
                    </div>
                    <span className={s.departureTime}>{train.departure_time}</span>
                </div>
            ))}
        </div>
    );
}
