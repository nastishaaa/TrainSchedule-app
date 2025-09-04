import { Link } from 'react-router';
import { useSelector } from 'react-redux';

import s from './HomeCards.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function HomeCards() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <div className={s.homeContainerWelcome}>
            <h1 className={s.title}>Welcome to Train Schedule</h1>

            <div className={s.cards}>
                <Link to="/trains" className={s.card}>
                    <h2>Trains</h2>
                    <p>Check out schedules and routes</p>
                </Link>
                {!isLoggedIn && 
                    <>
                    <Link to="/login" className={s.card}>
                    <h2>Login</h2>
                    <p>Access your account</p>
                </Link>

                <Link to="/register" className={s.card}>
                    <h2>Register</h2>
                    <p>Create a new account</p>
                </Link>
                    </>}
                
            </div>
        </div >
    );
}
