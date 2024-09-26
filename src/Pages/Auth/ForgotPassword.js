import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../Redux/Slice/AuthSlice';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword({ email }))
    };

    return (
        <div className="forgot-container">
            <h1 className='hed-1'>Forgot password</h1>
            <form onSubmit={handleSubmit} className='forgot-form'>
                <input className='forgot-input'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email here..."
                />
                <div className='buttons'>
                    <button className='btn6' type="submit">Get link</button>

                    <Link to="/">
                        <button className='btn7'>Back</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;