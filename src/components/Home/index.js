import React from 'react';
import AddGameButton from '../AddGameButton'
import { Card, Container, Typography, CardContent } from '@material-ui/core'

const Home = ({ userInfo, loggedIn }) => {

    return (
        <Container>
             {userInfo ? (
                <>
                    <Typography variant='h1'>
                        Welcome, {userInfo.username}
                    </Typography>
                    <AddGameButton />
                </>
            ) : 
            (
                <Card>
                    <CardContent >
                        <Typography variant='h1'>Welcome Please Login</Typography>
                    </CardContent>

                </Card>
            )}
        </Container>
    );
};

export default Home;