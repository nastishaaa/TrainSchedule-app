import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import HeaderAuth from "../components/HeaderAuth/HeaderAuth";
import Header from "../components/Header/Header";
import Loader from "../components/Loader/Loader";
import Footer from '../components/Footer/Footer'
import { selectIsLoggedIn } from '../redux/auth/selectors';
import { useSelector } from "react-redux";

export default function RootLayout() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const style = {
        display: "flex",
        flexDirection: "column",
        minHeight: "95vh",
    };
    const mainContentStyle = {
        flexGrow: 1,
    };

    return (
        <>
            <div style={style}>
                {isLoggedIn ? <HeaderAuth /> : <Header />}
                <main style={mainContentStyle}>
                    <Suspense fallback={<Loader />}>
                        <Outlet />
                    </Suspense>
                </main>

                <Footer />
            </div>
        </>
    );
}