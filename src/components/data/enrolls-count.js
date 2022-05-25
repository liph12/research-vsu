import * as React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import Title from '../title';
import axiosInstance from '../../config/axios-instance';
import { useState, useEffect } from 'react';
import Enrolls from '../enrolls';

const EnrollsCount = () => {
    const [count, setCount] = useState([]);
    const [sy, setSy] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('token') !== null){
            axiosInstance.get('/count-enrolls', {
                headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(response => {
                setCount(response.data.count);
                setSy(response.data.schoolYear);
            })
        }
    },[])

    return (
        <>
        <PeopleIcon style={{ fontSize: 80 }} />
        <Title>
             Enrolls
        </Title>
        <Typography component="p" variant="h4">
            {count}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
            S.Y {sy}
        </Typography>
        <div>
            <Link to={'/enrolls'} element={ <Enrolls /> }>
            View
            </Link>
        </div>
        </>
    );
}

export default EnrollsCount;