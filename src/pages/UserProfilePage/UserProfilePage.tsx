import s from './UserProfilePage.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
import { selectBoughtTikets } from '../../redux/trains/selectors';
import type { AppDispatch } from '../../redux/store';

import { Outlet, useNavigate } from 'react-router';
import { lazy } from 'react';
import { Suspense } from 'react';
import Loader from '../../components/Loader/Loader';

const TrainsList = lazy(() => import('../../components/TrainsList/TrainsList'));

export default function UserProfilePage() {
    const user = useSelector(selectUser);
    const boughtTikets = useSelector(selectBoughtTikets);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    const firstLetter = user?.name ? user.name[0].toUpperCase() : '?';

    return (
        <>
            <div className={s.profileContainer}>
                <div className={s.userPhoto}>{firstLetter}</div>
                <div className={s.userName}>{user?.name}</div>
                <div className={s.userEmail}>{user?.email}</div>
                <button className={s.logoutButton} onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className={s.tiketsList}>
                <h3>Your tikets</h3>
                <Suspense fallback={<Loader />}>
                    <TrainsList trains={boughtTikets} />
                </Suspense>
                <Outlet/>
            </div>
        </>
    );
}