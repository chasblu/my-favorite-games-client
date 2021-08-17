import React from 'react';
import AddGameButton from '../AddGameButton'
import { Container, Typography, } from '@material-ui/core'

const Home = ({ userInfo, loggedIn }) => {

    return (
        <Container>
            {userInfo && (
                <>
                    <Typography variant='h1'>
                        Welcome, {userInfo.username}
                    </Typography>
                    <AddGameButton />
                </>
            )}
        </Container>
    );
};

export default Home;