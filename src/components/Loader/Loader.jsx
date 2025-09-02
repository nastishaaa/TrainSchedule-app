import { ClockLoader } from 'react-spinners';
import clsx from 'clsx';
import s from './Loader.module.css';

export default function Loader() {
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <ClockLoader color='#2563EB' />
                <p className={clsx(s.caption, s.shinyText)} style={{ animationDuration: '3s' }}>
                    Loading, please wait...
                </p>
            </div>
        </div>
    );
}
