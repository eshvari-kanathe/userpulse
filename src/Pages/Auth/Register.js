import 'bootstrap/dist/css/bootstrap.min.css'
import './Auth.css';
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { registerUser, verifyEmail } from '../../Redux/Slice/AuthSlice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),

    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

    password: Yup.string()
        .min(6, 'Password too short')
        .required('Password is required'),
});

export default function RegisterPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { signupData, emailVerificationSuccess } = useSelector((state) => state.auth);
    console.log('Registration successful:', signupData)

    const handleEmailVerification = () => {
        const verification = {
            id: signupData.id,
            token: signupData.emailVerificationTOken,
        }
        // console.log(verification, "verify email")
        dispatch(verifyEmail(verification))
        // alert("Email verify successfully")
        // console.log(verification,"verification data")
    }

    useEffect(() => {
        if (emailVerificationSuccess) {
            navigate('/')
        }
    }, [emailVerificationSuccess])

    return (
        <div className="register-container">
            <div className="register-form">
                <h1>Registration Page</h1>

                <Formik
                    initialValues={{ name: '', email: '', password: '' }}
                    validationSchema={RegisterSchema}
                    onSubmit={(values) => {
                        dispatch(registerUser(values))
                        // alert("User register successfully")

                    }}
                >
                    {({ handleChange, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="name" component="div" className="error-message" />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="password" component="div" className="error-message" />
                            </div>
                            <button type="submit" >
                                Register
                            </button>
                        </Form>
                    )}
                </Formik>
                <button onClick={handleEmailVerification} className='varify-emailbtn'>
                    Email verification after Registeration
                </button>
            </div>
        </div>
    )
}
