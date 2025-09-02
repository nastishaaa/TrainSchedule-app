import s from './LoginForm.module.css'

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from 'yup';
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';

const initialValues = {
    email: '',
    password: '',
};

const FeedbackSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too short')
        .max(15, 'Too long')
        .required('Required'),
});

export default function LoginForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailField = useId();
    const passwordField = useId();

    const handleSubmit = async (values, actions) => {
        try {
            dispatch(login(values));
            navigate("/");
            toast.success('User Logged in!');
        } catch (error) {
            toast.error('Something went wrong...');
            console.log(error);
        }
        actions.resetForm();
    
    }

    return (
        <div className={s.formContainer}>
            <h2 className={s.title}>LogIn</h2>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={FeedbackSchema}
            >
                <Form className={s.form}>

                    <div>
                        <label htmlFor={emailField} className={s.label}>Email</label>
                        <Field
                            type="email"
                            name="email"
                            id={emailField}
                            autoComplete="off"
                            className={s.field} />
                        <ErrorMessage name="email" component="span" className={s.errorMess} />
                    </div>

                    <div>
                        <label htmlFor={passwordField} className={s.label} >Password</label>
                        <Field
                            type="password"
                            name="password"
                            id={passwordField}
                            autoComplete="off"
                            className={s.field} />
                        <ErrorMessage name="password" component="span" className={s.errorMess} />
                    </div>

            
                    <button
                        type="submit"
                        className={s.loginBtn}
                    >
                        Login
                    </button>
                </Form>
            </Formik>

            <div className={s.containerRegisterLink}>
                Don’t have an account? <Link to="/register" className={s.link}>Register now</Link>
            </div>
        </div>
    );
}