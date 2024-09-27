import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';

import './Auth.css';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin, loginUser } from '../../Redux/Slice/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(6, 'Password too short')
    .required('Required'),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginData, isErrorMessage, isError, isLoading } = useSelector(state => state.auth);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }else if(isError && isErrorMessage.includes("Deleted email")){
      navigate("/login")
    }
  }, [token, isError, isErrorMessage,])

  // useEffect(() => {
  //   if (isError) {
  //     if (isErrorMessage.includes("deleted email")) {
  //       navigate("/login")
  //     }
  //   }
  // }, [isError, isErrorMessage, navigate]);

  const onSuccess = (credentialResponse) => {
    const credential = {
      idToken: credentialResponse.credential
    }
    dispatch(googleLogin(credential));
  }


  const onError = () => {
    console.log('Login Failed')
  }

  return (
    <div className="login-container">
      <h2>Sign in</h2>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(loginUser(values))
          setSubmitting(false)
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting }) => (
          <Form className="login-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <Link to="/forgotpassword" className='forgot-link'>Forgot password</Link>
            <button type='submit' className='login-btn' disabled={isSubmitting || isLoading}>
              {isLoading ? <CircularProgress size={26} color='black' /> : 'Login'}
            </button>

            <p style={{ display: "flex", justifyContent: "center", fontWeight: 700 }}>or</p>

            <div className='google-login'>
              <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
              />
            </div>

            <Link to='/register' className='register-link'>Register</Link>
          </Form>
        )}
      </Formik>
    </div>
  )
}
