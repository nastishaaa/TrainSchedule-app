import { Form, Field, Formik, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import s from './SupportPage.module.css'
import toast from 'react-hot-toast';

interface SupportFormValues {
  name: string;
  email: string;
  message: string;
}

const initialValues: SupportFormValues = {
    name: '',
    email: '',
    message: '',
}

const SupportValidationSchema = Yup.object({
    name: Yup.string().required('Name is required!'),
    email: Yup.string().required('Email is required!'),
    messaga: Yup.string().required('Message is required!'),
})

export default function SupportPage() {

    const handleSubmit = (values: SupportFormValues, {resetForm}: FormikHelpers<SupportFormValues>) => {
        console.log(values);
        toast.success('Thank you for your message! Best Regards, TrainSchedule Team!')
        resetForm();
    }

    return (
        <div className={s.page}>
            <div className={s.container}>
                <h1 className={s.title}>Support Center</h1>
                <p className={s.subtitle}>
                    Need help with TrainSchedule? Fill out the form below and our team will get back to you.
                </p>

                <Formik initialValues={initialValues}
                    validationSchema={SupportValidationSchema}
                onSubmit={handleSubmit}>
                    <Form className={s.form} >
                        <label className={s.label} htmlFor='name' >
                            Your Name
                            <Field type="text" name='name' id='name' placeholder="Enter your name" className={s.input} />
                        </label>
                        <ErrorMessage name="name" component="span" className={s.errorMess} />

                        <label className={s.label} htmlFor='email'>
                            Email
                            <Field type="email" name='email' id='email' placeholder="Enter your email" className={s.input} />
                        </label>
                        <ErrorMessage name="email" component="span" className={s.errorMess} />

                        <label className={s.label} htmlFor='message'>
                            Message
                            <Field as="textarea" placeholder="Describe your issue..." name='message' id='message' className={s.textarea}></Field>
                        </label>
                        <ErrorMessage name="message" component="span" className={s.errorMess} />

                        <button type="submit" className={s.button}>Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
