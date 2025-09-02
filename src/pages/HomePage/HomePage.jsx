import s from './HomePage.module.css';

import HomeSliceTrains from '../../components/HomeSliceTrains/HomeSliceTrains'
import HomeCards from '../../components/HomeCards/HomeCards';

export default function HomePage() {
    return (
        <div className={s.homeContainer}>
            <HomeCards />
            <HomeSliceTrains />
        </div>
    );
}
