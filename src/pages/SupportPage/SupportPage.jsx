import { Form, Field, Formik } from 'formik';
import s from './SupportPage.module.css'
import toast from 'react-hot-toast';

const initialValues = {
    name: '',
    email: '',
    message: '',
}

export default function SupportPage() {

    const handleSubmit = (values, {resetForm}) => {
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
                onSubmit={handleSubmit}>
                    <Form className={s.form} >
                        <label className={s.label} htmlFor='name' >
                            Your Name
                            <Field type="text" name='name' id='name' placeholder="Enter your name" className={s.input} />
                        </label>

                        <label className={s.label} htmlFor='email'>
                            Email
                            <Field type="email" name='email' id='email' placeholder="Enter your email" className={s.input} />
                        </label>

                        <label className={s.label} htmlFor='message'>
                            Message
                            <Field as="textarea" placeholder="Describe your issue..." name='message' id='message' className={s.textarea}></Field>
                        </label>

                        <button type="submit" className={s.button}>Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
