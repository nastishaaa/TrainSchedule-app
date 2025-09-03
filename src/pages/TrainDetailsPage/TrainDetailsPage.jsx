import { selectCurrentTrain, selectBoughtTikets } from '../../redux/trains/selectors';
import { formatDuration } from '../../utils/formatDuration';
import { buyTiket, getTrainById } from '../../redux/trains/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

import s from './TrainDetailsPage.module.css';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function TrainDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const train = useSelector(selectCurrentTrain);
    const bought = useSelector(selectBoughtTikets);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    
    const [ticketBought, setTicketBought] = useState(false);
    
    useEffect(() => {
        if (train) {
            const isBought = bought.some(t => t.id === train.id);
            setTicketBought(isBought);
        }
    }, [train, bought]);

    useEffect(() => {
        if (id) {
            dispatch(getTrainById(id));
        }
    }, [dispatch, id]);

    if (!train) return <p className={s.notFound}>Train not found</p>;

    const handleBuyTicket = (id) => {
        try {
            setTicketBought(true);
            dispatch(buyTiket(id));
            toast.success(`You bought a ticket for ${train.name}! 🎫`);
        } catch {
            toast.error('Please, Authorize first!')
        }
       };

    return (
        <div className={s.pageWrapper}>
            <div className={s.card}>
                <div className={s.trainHeader}>
                    <span className={s.trainNumber}>{train.number}</span>
                    <span className={s.trainName}>{train.name}</span>
                </div>
                
                <div className={s.trainStations}>
                    <span className={s.station}>{train.departure_station}</span>
                    <span className={s.stationArrow}>→</span>
                    <span className={s.station}>{train.arrival_station}</span>
                </div>
                
                <div className={s.trainTimes}>
                    <span className={s.time}>{train.departure_time}</span>
                    <span className={s.time}>{train.arrival_time}</span>
                </div>
                
                <div className={s.trainDetails}>
                    <span className={s.detail}>Duration: {formatDuration(train.travel_duration)}</span>
                    <span className={s.detail}>Seats: {train.seats_available}</span>
                    <span className={s.detail}>Price: ${train.price}</span>
                </div>
                {!isLoggedIn ?
                    <p className={s.registerNotice}>
                        To buy a ticket, please <Link to="/register">register</Link> first. 🎫
                    </p> : <div className={s.actionSection}>
                        {ticketBought ? (
                            <button className={s.boughtBtn} disabled>
                                Ticket Bought ✅
                            </button>
                        ) : (
                            <button className={s.buyBtn} onClick={() => handleBuyTicket(train.id)}>
                                Buy Ticket 🎫
                            </button>
                        )}
                    </div>}

                
            </div>
        </div>
    );
}
