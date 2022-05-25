import * as React from 'react';
import { styled, useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import { useMediaQuery } from '@mui/material/';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import ScanQRIcon from '@mui/icons-material/QrCodeScanner';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Pages = [
  {
    id : 1,
    title : "Dashboard",
    route : "dashboard",
    icon : <DashboardIcon /> 
  },
  {
    id : 2,
    title : "Enrolls",
    route : "enrolls",
    icon : <PeopleIcon /> 
  },
  {
    id: 3,
    title : "Scan QR",
    route : "scanqr",
    icon : <ScanQRIcon /> 
  },
  {
    id: 4,
    title : "Logout",
    route : "login",
    icon : <LogoutIcon /> 
  }
]

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Logout = (navigate) => {
  if(localStorage.getItem('token') !== null){
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    setTimeout(() => {
      navigate('/login')
    }, 500)
  }
}

const mdTheme = createTheme();

export default function MiniDrawer({ Main, Title }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if(useMediaQuery(theme.breakpoints.up('lg'))){
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={true}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                {Title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={true}>
          <DrawerHeader/>
          <Divider />
          <List>
            {Pages.map((page) => (
              <ListItem key={page.title} disablePadding 
              sx={{ 
                display: 'block', 
              }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: 'initial',
                    px: 2.5,
                  }}
                  onClick={() => { page.id != 4 ? navigate(`/${page.route}`) : Logout(navigate) }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: 'center',
                    }}
                  >
                    { page.icon }
                  </ListItemIcon>
                  <ListItemText primary={page.title} sx={{ opacity: 1 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
          <Box component="main"           
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}>
            <DrawerHeader />
            <Main />
          </Box>
        </Box>
      </ThemeProvider>
    );
  }else{
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                {Title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {Pages.map((page) => (
              <ListItem key={page.title} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => { page.id != 4 ? navigate(`/${page.route}`) : Logout(navigate) }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    { page.icon }
                  </ListItemIcon>
                  <ListItemText primary={page.title} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
          <Box component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}>
            <DrawerHeader />
            <Main />
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}
