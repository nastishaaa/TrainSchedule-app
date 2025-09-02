import s from './RegisterForm.module.css'

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from 'yup';
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { register } from '../../redux/auth/operations';

const initialValues = {
    name: '',
    email: '',
    password: '',
};

const FeedbackSchema = Yup.object().shape({
    name: Yup.string().max(25, 'Too long').min(3, 'Too short'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too short')
        .max(15, 'Too long')
        .required('Required'),
});

export default function RegisterForm() {

    const dispatch = useDispatch();
    
    const nameField = useId();
    const emailField = useId();
    const passwordField = useId();

    const handleSubmit = async (values, actions) => {
        try {
            dispatch(register(values));
            toast.success('User Registered!');
        } catch (error) {
            toast.error('Something went wrong...');
            console.log(error);
        }
        actions.resetForm();
    
    }

    return (
        <div className={s.formContainer}>
            <h2 className={s.title}>Register</h2>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={FeedbackSchema}
            >
                <Form className={s.form}>

                    <div>
                        <label htmlFor={nameField} className={s.label}>Name</label>
                        <Field
                            type="text"
                            name="name"
                            id={nameField}
                            autoComplete="off"
                            className={s.field} />
                        <ErrorMessage name="name" component="span" className={s.errorMess} />
                    </div>

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
                        Register
                    </button>
                </Form>
            </Formik>

            <div className={s.containerRegisterLink}>
                Do you already have an account?<Link to="/login" className={s.link}>Login now</Link>
            </div>
        </div>
    );
}