import React from 'react';
import AddGameButton from '../AddGameButton'
import { Container, Typography, } from '@material-ui/core'

const Home = ({ userInfo, loggedIn }) => {

    return (
        <Container>
             {loggedIn ? (
                <>
                    <Typography variant='h1'>
                        Welcome, {userInfo.username}
                    </Typography>
                    <AddGameButton />
                </>
            ) : 
            (
                <Typography>Welcome Please Log In</Typography>
            )}
        </Container>
    );
};

export default Home;