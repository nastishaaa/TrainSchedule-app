import { useSelector, useDispatch } from 'react-redux';
import { getTrains } from '../../redux/trains/operations';
import { selectIsLoading, selectFilteredTrains } from '../../redux/trains/selectors';
import { useEffect } from 'react';
import { Link } from 'react-router';

import Loader from '../../components/Loader/Loader';
import TrainItem from '../../components/TrainItem/TrainItem';
import s from './TrainsListPage.module.css';
import { setFilters } from '../../redux/trains/slice';

export default function TrainsListPage() {
    const dispatch = useDispatch();

    const trains = useSelector(selectFilteredTrains);
    const isLoading = useSelector(selectIsLoading);

    const handleChange = (e) => {
        dispatch(setFilters({ [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        dispatch(getTrains());
    }, [dispatch]);
    
    return (
        <div className={s.pageContainer}>
            <h1 className={s.pageTitle}>Trains List</h1>

            <div className={s.searchContainer} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    name="departure"
                    placeholder="Departure station"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="arrival"
                    placeholder="Arrival station"
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="minSeats"
                    placeholder="Min seats"
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max price"
                    onChange={handleChange}
                />
            </div>
            
            {!isLoading ? (
                <ul className={s.trainsList}>
                    {Array.isArray(trains) && trains.map(train => (
                        <Link to={`/trains/${train.id}`}>
                            <li key={train.id}>
                                <TrainItem item={train} />
                            </li>
                        </Link>
                    ))}
                </ul>
            ) : (
                <div className={s.loaderContainer}>
                    <Loader />
                </div>
            )}
        </div>
    );
}