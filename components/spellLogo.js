import React,{ useEffect, useState } from 'react';
import { styled, alpha, ThemeProvider, createTheme } from '@mui/material/styles';
import {Stack,AppBar, Box, Toolbar, IconButton, Typography, Badge, Menu, MenuItem, InputBase, CssBaseline, Button} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SubFab from './SubFab.js';
import { Link, } from '@mui/icons-material';

const logoTheme = createTheme({
    typography: {
      fontFamily: [
        'Imprint MT Shadow',
        '"Helvetica Neue"'
      ].join(','),
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });


  export default function spellLogo() {
    return (
      <Box sx={{ width:'100%'}}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
              <Box sx={{display:'flex'}}>
                <ThemeProvider theme={logoTheme}>
                  <Button href="/#">
                  <Box>
                  <Box sx={{display:'flex',pb:0,mb:0, height:0}}> <Typography variant="h4" color='#FFC90E' textTransform='capitalize'>Pitch</Typography><Typography variant="h4" color='black' textTransform='capitalize'> Black</Typography></Box>
                  <Box sx={{display:'flex',pt:0,mt:0, }}><Typography variant="h5" color='black' textTransform='capitalize'>_____</Typography><Typography variant="h4" color='#FFC90E' textTransform='capitalize'>_____</Typography></Box>
                  </Box>
                  </Button>
                </ThemeProvider>
              </Box>
        </ThemeProvider>
      </Box>
    );
  }
  