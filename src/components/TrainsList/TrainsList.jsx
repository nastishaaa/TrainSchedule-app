import s from './TrainsList.module.css';

export default function TrainsList({trains}) {
    return (
        <div className={s.listContainer}>
            <ul className={s.trainsList}>
                {trains.map((item, index) => (
                    <li key={index}>
                        {index}
                    </li>
                ))}
            </ul>
        </div>
    );
}
