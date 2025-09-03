import { useSelector, useDispatch } from 'react-redux';
import { getTrains } from '../../redux/trains/operations';
import { selectTrains, selectIsLoading } from '../../redux/trains/selectors';
import { useEffect } from 'react';
import { Link } from 'react-router';

import Loader from '../../components/Loader/Loader';
import TrainItem from '../../components/TrainItem/TrainItem';
import s from './TrainsListPage.module.css';

export default function TrainsListPage() {
    const dispatch = useDispatch();

    const trains = useSelector(selectTrains);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(getTrains());
    }, [dispatch]);
    
    return (
        <div className={s.pageContainer}>
            <h1 className={s.pageTitle}>Trains List</h1>

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
