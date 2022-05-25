import ToolBar from './toolbar';
import * as React from 'react';
import { Box, Container, Typography, Avatar, CssBaseline } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const DisplayError = () => (
    <>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box 
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'error.main' }}> <ErrorOutlineOutlinedIcon /> </Avatar>
            <Typography component="h1" variant="h4">
             Error 404 : Page Not Found!
            </Typography>
            </Box>
        </Container>    
    </>
)

const Error = () => {
    return (
        <>
        <ToolBar Main={ DisplayError } Title={'Page Not Found'} />
        </>
    )
}

export default Error;