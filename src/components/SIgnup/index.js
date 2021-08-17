import React from 'react';
import { useState } from 'react'
import { TextField, Typography, IconButton, InputAdornment, Button } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useHistory, Link } from 'react-router-dom';

const Signup = () => {
    const initialFormData = {
        username: '',
        email: '',
        password: '',
        re_password: '',
    };
    const history = useHistory();
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState()

    const handleChange = (e) => {
        setFormData((prevState) => {
            return { ...prevState, [e.target.id]: e.target.value }
        });
    };
    const handlePasswordMatch = (e) => {
        if (formData.password !== formData.re_password) {
            setError(true);
        } else {
            setError(false);
        }
    };
    const _handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/users/', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                setSuccess(true);
                setTimeout(() => {
                    history.push('/login');
                }, 3000);
            } else {
                const data = await response.json();
                return <p>
                    {data}
                </p>
            }
        } catch (error) {
            console.log(error)
        }
    };
    const _handleTogglePassword = () => setShowPassword(showPassword => !showPassword);

    return (
        <div>
            <Typography variant='h2'>
                Create an Account
            </Typography>
            <form onSubmit={_handleSignup}>

                <TextField
                    id='username'
                    label='Username'
                    variant='outlined'
                    helperText='Create a Username'
                    required
                    unique
                    onChange={handleChange}
                />
                <TextField
                    id='email'
                    label='Email'
                    variant='outlined'
                    helperText='We will never share your email'
                    required
                    onChange={handleChange}
                />
                <TextField
                    id='password'
                    label='Password'
                    aria-label='Password'
                    variant='outlined'
                    helperText='Password must be at least 8 characters and include letters and numbers'
                    required
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label='toggle show password'
                                onClick={_handleTogglePassword}
                                color='secondary'
                            >
                                <Visibility />
                            </IconButton>
                        </InputAdornment>
                    }
                />

                <TextField
                    id='re_password'
                    label='Confirm Password'
                    variant='outlined'
                    required
                    onChange={handleChange}
                    onBlur={handlePasswordMatch}
                    helperText='Passwords must match exactly'
                />
                <Button type='submit' disabled={error}>Sign Up</Button>
                {error && (
                    <Alert severity="error">Passwords must match!
                        <AlertTitle>Error</AlertTitle>
                    </Alert>
                )}
                {success && (
                    <Alert severity='success'>
                        <AlertTitle>Success</AlertTitle>
                        User successfully created! You will be redirected to log in. If you
                        are not automatically redirected, please click{' '}
                        {<Link to='/login'>here</Link>}.
                    </Alert>
                )}
            </form>
        </div>
    );
};

export default Signup;