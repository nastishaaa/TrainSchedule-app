import s from './TrainItem.module.css';

const formatDuration = (duration) => {
    if (!duration) return '';
    const h = duration.hours || 0;
    const m = duration.minutes || 0;
    return `${h}h ${m}m`;
}

export default function TrainItem({item}) {
    return (
        <div className={s.trainCard}>
            <div className={s.trainHeader}>
                <span className={s.trainNumber}>{item.number}</span>
                <span className={s.trainName}>{item.name}</span>
            </div>

            <div className={s.trainStations}>
                <span className={s.station}>{item.departure_station}</span>
                <span className={s.stationArrow}>→</span>
                <span className={s.station}>{item.arrival_station}</span>
            </div>

            <div className={s.trainTimes}>
                <span className={s.time}>{item.departure_time}</span>
                <span className={s.time}>{item.arrival_time}</span>
            </div>

            <div className={s.trainDetails}>
                <span className={s.detail}>Duration: {formatDuration(item.travel_duration)}</span>
                <span className={s.detail}>Seats: {item.seats_available}</span>
                <span className={s.detail}>Price: ${item.price}</span>
            </div>
        </div>
    );
}
