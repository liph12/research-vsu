import ToolBar from './toolbar';
import * as React from 'react';
import EnrollsTable from './data/enrolls-table';
import CircularProgress from '@mui/material/CircularProgress';
import { Paper, Container, Grid } from '@mui/material';
import Title from './title';

const Enrolls = () => {
    const EnrollsData = () => (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <EnrollsTable />
            </Paper>
        </Grid>
      </Container>
    )

    return(
        <>
           <ToolBar Main={ EnrollsData } Title={'Enrolls'} />
        </>
    )
}

export default Enrolls;