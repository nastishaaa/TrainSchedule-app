import { Link } from 'react-router';
import s from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={s.footer}>
            <div className={s.container}>
                <div className={s.brand}>TrainSchedule © {new Date().getFullYear()}</div>

                <nav className={s.nav}>
                    <Link to="/">About</Link>
                    <Link to="/support">Support</Link>
                </nav>
            </div>

            <div className={s.rail}></div>
        </footer>
    );
}
