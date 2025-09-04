import s from './TrainsList.module.css';
import Loader from '../../components/Loader/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { selectBoughtTikets } from '../../redux/trains/selectors';
import toast from 'react-hot-toast';
import { lazy } from 'react';
import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { removeBoughtTicket } from '../../redux/trains/slice';

const TrainItem = lazy(() => import('../TrainItem/TrainItem'));

export default function TrainsList({ trains }) {
    const boughtTikets = useSelector(selectBoughtTikets);
    const dispatch = useDispatch();

    const handleDeleteTicket = (id) => {
        try {
            dispatch(removeBoughtTicket(id));
            toast.success('reservation successfully canceled')
        } catch {
            toast.error('Something went wrong! Try again later')
        }
    }
    if(trains.length === 0) return <div>No founds</div>
    return (
        <div className={s.listContainer}>
            <ul className={s.trainsList}>
                {trains.map((item, index) => (
                    <li className={s.boughtTiketsItem} key={index}>
                        <Suspense fallback={<Loader />}>
                            <TrainItem item={item} />
                        </Suspense>
                        {trains === boughtTikets &&
                        <button
                            className={s.deleteBtn}
                            onClick={() => handleDeleteTicket(item.id)}
                            >
                            Delete
                            </button>}
                        <Outlet/>
                    </li>
                ))}
            </ul>
        </div>
    );
}
