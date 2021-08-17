import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { TextField, Typography, IconButton, InputAdornment, Button } from '@material-ui/core';
import { VisibilityOff } from '@material-ui/icons'

const Login = ({ handleSetLogIn, handleLogOut }) => {
    const initialFormData = {
        email: '',
        password: '',
    };
    const history = useHistory();
    const [formData, setFormData] = useState(initialFormData);
    const [showPassword, setShowPassword] = useState()

    const _handleChange = (e) => {
        setFormData((prevState) => {
            return { ...prevState, [e.target.id]: e.target.value }
        });
    }

    const _handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/token/login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                const token = await res.json();
                console.log(token);
                handleSetLogIn(token.auth_token);
                history.push('/')
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.log(error)
        }
    }

    const _handleTogglePassword = () => setShowPassword(showPassword => !showPassword);

    return (
        <div>
            <Typography variant='h2'>
                Log In
            </Typography>
            <form onSubmit={_handleLogin}>
                <TextField
                    id='email'
                    label='Email'
                    variant='outlined'
                    helperText='Enter your Email'
                    required
                    onChange={_handleChange}
                />
                <TextField
                    id='password'
                    label='Password'
                    aria-label='Password'
                    variant='outlined'
                    helperText='Enter your Password'
                    required
                    onChange={_handleChange}
                    endAdornment={
                        <IconButton
                            aria-label='toggle show password'
                            onClick={_handleTogglePassword}
                        >
                            <VisibilityOff />
                        </IconButton>

                    }
                />
                <Button type='submit'>Log In</Button>

            </form>
        </div>
    );
};

export default Login;