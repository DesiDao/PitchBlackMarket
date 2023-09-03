import React,{ useEffect, useState } from 'react';
import {ThemeProvider, createTheme } from '@mui/material/styles';
import {Stack,AppBar, Box, Toolbar, IconButton, Typography, Fade,Badge, Menu, MenuItem, InputBase, CssBaseline, Button, Tooltip} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SubFab from './SubFab.js';
import { Link } from '@mui/icons-material';
import CalculateIcon from '@mui/icons-material/Calculate';
import MapIcon from '@mui/icons-material/Map';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const logoTheme = createTheme({
  typography: {
    fontFamily: [
      'Imprint MT Shadow',
      '"Helvetica Neue"'
    ].join(','),
  },
});


export default function Nav() {
  const Image = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/Logo.png";
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    > 

      <Button onClick={handleMenuClose} href={`/signin`}>Profile</Button>
   
      <Button onClick={handleMenuClose}>SIGN</Button>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Tooltip title="Stat Calculator" placement="bottom" followCursor TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
      <MenuItem>
        <IconButton size="large" aria-label="Stat Calculator" color="inherit" >
            <CalculateIcon />
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      </Tooltip>
      <MenuItem>
      <Tooltip title="Maps - Soon!" placement="bottom" followCursor TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
            <MapIcon />
        </IconButton>
        </Tooltip>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ width:'100%'}}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
              <ThemeProvider theme={logoTheme}>
                <Button href="/#">
                <Stack>
                <Box sx={{display:'flex',pb:0,mb:0, height:0}}> <Typography variant="h6" color='#FFC90E' textTransform='capitalize'> </Typography><Typography variant="h4" color='#FFC90E' textTransform='capitalize'>Pitch</Typography><Typography variant="h4" color='black' textTransform='capitalize'>Black</Typography></Box>
                <Box sx={{display:'flex',pt:0,mt:0 }}><Typography variant="h4" color='black' textTransform='capitalize'>_____</Typography><Typography variant="h4" color='#FFC90E' textTransform='capitalize'>_____</Typography></Box>
                </Stack>
                </Button>
              </ThemeProvider>
            <Box sx={{ flexGrow: 1 }} />

            
            <Box sx={{ display:'flex' }}>
              
              <IconButton size="large" aria-label="Stat Calculator" color="inherit" href={`/statcalc`}>
              <Tooltip title="Stat Calculator" placement="bottom" followCursor TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
                <CalculateIcon />
              </Tooltip>
              </IconButton>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Tooltip title="Maps - Soon!" placement="bottom" followCursor TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
                <Badge color="error">
                  <MapIcon />
                </Badge>
                </Tooltip>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                href="/account"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>

          </Toolbar>
        </AppBar>
        {renderMenu}
      </ThemeProvider>
      <SubFab />
    </Box>
  );
}
