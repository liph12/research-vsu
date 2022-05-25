import ToolBar from './toolbar';
import * as React from 'react';
import EnrollsCount from './data/enrolls-count';
import { Paper, Container, Grid } from '@mui/material';

const DashboardData = () => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Grid container spacing={3}>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
        <EnrollsCount />
        </Paper>
      </Grid>
    </Grid>
  </Container>
)

const Dashboard = () => {
  return(
    <>
    <ToolBar Main={ DashboardData } Title={'Dashboard'} />
    </>
  )
}

export default Dashboard;