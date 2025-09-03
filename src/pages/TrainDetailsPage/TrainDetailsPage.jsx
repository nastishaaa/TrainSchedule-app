import { useParams } from 'react-router-dom';
import { getTrainById } from '../../redux/trains/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTrain } from '../../redux/trains/selectors';
import s from './TrainDetailsPage.module.css';
import { useEffect, useState } from 'react';
import { formatDuration } from '../../utils/formatDuration';

export default function TrainDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const train = useSelector(selectCurrentTrain);
    const [ticketBought, setTicketBought] = useState(false);

    
    useEffect(() => {
        if (id) {
            dispatch(getTrainById(id));
        }
    }, [dispatch, id]);
    

    if (!train) return <p className={s.notFound}>Train not found</p>;

    const handleBuyTicket = () => {
        setTicketBought(true);
        alert(`You bought a ticket for ${train.name}! 🎫`);
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

                <div className={s.actionSection}>
                    {ticketBought ? (
                        <button className={s.boughtBtn} disabled>
                            Ticket Bought ✅
                        </button>
                    ) : (
                        <button className={s.buyBtn} onClick={handleBuyTicket}>
                            Buy Ticket 🎫
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
