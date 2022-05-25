import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { Box, Container, CssBaseline, CircularProgress } from '@mui/material';
import useAuthenticated from '../config/authenticate';

const RequireAuth = () => {
    const location = useLocation();
    const auth = useAuthenticated();

    if(auth === null){
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box 
                    sx={{
                    marginTop: 40,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                </Box>
            </Container>   
        )
    }

    return (
        auth ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth;