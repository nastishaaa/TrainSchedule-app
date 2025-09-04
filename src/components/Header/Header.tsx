import { Link, NavLink } from 'react-router-dom';
import s from './Header.module.css';

export default function Header() {
    return (
        <header className={s.header}>
            <div className={s.logoContainer}>
                <img src='../../assets/TrainSchedule.png' alt="TrainSchedule Logo image" width='24' height='24' />
                <Link to={'/'} className={s.logo}>TrainSchedule</Link>
            </div>

            <div className={s.navContainer}>
                <nav className={s.navigation}>   
                    <NavLink to='/login' >Login</NavLink>
                    <NavLink to='/register' >Register</NavLink>
                    <NavLink to='/trains' >Trains</NavLink>
                </nav>
            </div>
            
        </header>
    );
}
