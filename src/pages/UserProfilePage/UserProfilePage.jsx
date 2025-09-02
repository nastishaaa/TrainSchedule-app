import s from './UserProfilePage.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';

import { useNavigate } from 'react-router';

export default function UserProfilePage() {
    const user = useSelector(selectUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    const firstLetter = user?.name ? user.name[0].toUpperCase() : '?';

    return (
        <div className={s.profileContainer}>
            <div className={s.userPhoto}>{firstLetter}</div>
            <div className={s.userName}>{user?.name}</div>
            <div className={s.userEmail}>{user?.email}</div>
            <button className={s.logoutButton} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}