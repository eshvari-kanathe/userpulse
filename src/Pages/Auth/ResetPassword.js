import React, { useState } from 'react';
import './Auth.css';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../Redux/Slice/AuthSlice';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token, id } = useParams()
    // console.log(token, id)
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const reset = {
            token: token,
            userId: id,
            password: password,
        }

        if (password !== confirmPassword) {
            alert('Password do not match');
        }

        dispatch(resetPassword(reset))
        setPassword("")
        setConfirmPassword("")
        alert("reset password successfully")
    };

    return (
        <div className=" reset-container">
            <h1 className='reset-hed-1'>Reset password</h1>
            <form onSubmit={handleSubmit} className='reset-form'>
                <input className='reset-input'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                />
                <input className='reset-input'
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                />
                <button className='btn5' type="submit">Reset password</button>
            </form>
        </div>
    );
}

export default ResetPassword;



