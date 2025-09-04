import { Link, NavLink, useNavigate } from 'react-router-dom';
import s from './HeaderAuth.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors'
import { AppDispatch } from '../../redux/store';

export default function HeaderAuth() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector(selectUser); 
    const firstLetter = user.email ? user.email.charAt(0).toUpperCase() : '';

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <header className={s.header}>
                    <div className={s.logoContainer}>
                        <img src='/assets/TrainSchedule.png' alt="TrainSchedule Logo image" width='24' height='24' />
                        <Link to={'/'} className={s.logo}>TrainSchedule</Link>
                    </div>
        
                    <div className={s.navContainer}>
                <nav className={s.navigation}>
                    {user ? <NavLink to='/profile' >
                        <div className={s.userInfo}>
                            <div className={s.userPhoto}>{firstLetter}</div>
                            <p className={s.username}>{ user.name}</p>
                        </div>
                    </NavLink> : <p>Loading...</p> }
                    
                            <NavLink to='/trains' >Trains</NavLink>
                </nav>
                <button className={s.logoutBtn}
                onClick={handleLogout}>Logout</button>
                </div>
                    
                </header>
    );
}
