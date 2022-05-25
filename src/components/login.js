import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, Container, TextField, Typography, CssBaseline, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axiosInstance from '../config/axios-instance';
import Toast from './toast';
import useAuthenticated from '../config/authenticate';
import { useLocation, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

export default function BasicCard() {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severinty, setSeverinty] = useState('success');
    const auth = useAuthenticated();
    const location = useLocation();
    const [loggedIn, setLoggedIn] = useState(false);
    
    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: Yup.object({
          email: Yup
            .string()
            .email(
              'Must be a valid email')
            .max(255)
            .required(
              'Email is required'),
          password: Yup
            .string()
            .max(255)
            .required(
              'Password is required')
        }),
        onSubmit: async (values) => {
            const userData = JSON.stringify(values)

            axiosInstance.post(`/login`, userData, {
              headers: {
                'Content-Type': 'application/json',
              }
            }).then(response => {
              if(response.status == 200){
                setOpen(true);
                if(response.data.success){
                  setSeverinty('success');
      
                  localStorage.setItem('user', JSON.stringify(response.data.user))
                  localStorage.setItem('token', response.data.user.accessToken)

                  setTimeout(() => {
                    setLoggedIn(true);
                  }, 1500);
      
                }else{
                  setSeverinty('error');
                }
              }
              setMessage(response.data.message);
            }).catch(e => {
              console.log(e)
            })
        }
      });

    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return
        }
        setOpen(false)
    }

    if(auth || loggedIn){

      return(
        <>
          <Navigate to='/dashboard' state={{ from: location }} replace />
        </>
      )

    }else if(!auth){
      return (
        <>
            <Toast 
            message={message}
            severinty={severinty}
            open={open}
            handleClose={handleClose}
            />
                <Box
            component="main"
            sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            minHeight: '100%'
            }}
        >
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Box 
                  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                </Box>
                <Box
                sx={{
                    pb: 1,
                    pt: 3
                }}
                >
                </Box>
                <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
                />
                <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    Sign In Now
                </Button>
                </Box>
            </Box>
            </Container>
        </Box>
        </>
    );
    }
}
