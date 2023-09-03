import React,{ useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Box, Skeleton,Avatar,Tooltip, Fade } from '@mui/material';

const avatarStyles = {
    width: 120, 
    height: 96,
  }

export default function ClassAva(props){
    return (
      ((props.str?.search(props.alt) >= 0 || props.str == 'ALL') && props.alt != 'Soon') ? 
      <Tooltip title={props.alt} followCursor TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
      <Avatar alt={props.alt} src ={process.env.NEXT_PUBLIC_SUPABASE_URL+`/storage/v1/object/public/imagelist/${props.alt}Badge.png`} sx={{...avatarStyles,border:'1px black solid'}}/>
      </Tooltip> : 
      <Skeleton variant="circular" sx={{...avatarStyles,border:'1px black groove'}} />
    );
  };