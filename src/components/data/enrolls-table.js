import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axiosInstance from '../../config/axios-instance';
import Title from '../title';
import { useState, useEffect } from 'react';

const columns = [
    { field: 'LRN', headerName: 'LRN', width: 275 },
    { field: 'firstName', headerName: 'First name', width: 275 },
    { field: 'lastName', headerName: 'Last name', width: 275 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  const EnrollsTable = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('token') !== null){
            axiosInstance.get('/enrolls', {
                headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(response => {
                setRows(response.data);
            })
        }
    },[])

    const tableData = rows.map(data => {
        return {
            id: data._id,
            LRN: data.LRN,
            firstName: data.firstName,
            lastName: data.lastName
        }
    })

    return(
        <>
        <Title>Enrolls Table</Title>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
            rows={tableData}
            columns={columns}
            checkboxSelection
            />
        </div>
        </>
    )
  }

  export default EnrollsTable;
