import React,{ useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Box, Skeleton,Avatar,Tooltip, Fade } from '@mui/material';

const SRC = [
    {
      url: 'https://msmssgqxmfnvrockxuzx.supabase.co/storage/v1/object/public/imagelist/BarbarianBadge.png',
      alt: 'Barbarian',
    },
    {
      url: 'https://msmssgqxmfnvrockxuzx.supabase.co/storage/v1/object/public/imagelist/ClericBadge.png',
      alt: 'Cleric',
    },
    {
      url: 'https://msmssgqxmfnvrockxuzx.supabase.co/storage/v1/object/public/imagelist/FighterBadge.png',
      alt: 'Fighter',
    },
    {
      url: 'https://msmssgqxmfnvrockxuzx.supabase.co/storage/v1/object/public/imagelist/RangerBadge.png',
      alt: 'Ranger',
    },
    {
      url: 'https://msmssgqxmfnvrockxuzx.supabase.co/storage/v1/object/public/imagelist/RogueBadge.png',
      alt: 'Rogue',
    },
    {
      url: 'https://msmssgqxmfnvrockxuzx.supabase.co/storage/v1/object/public/imagelist/WizardBadge.png',
      alt: 'Wizard'
    },
    {
      url: 'https://msmssgqxmfnvrockxuzx.supabase.co/storage/v1/object/public/imagelist/BardBadge.png',
      alt: 'Bard',
    },
    {
      url: 'https://msmssgqxmfnvrockxuzx.supabase.co/storage/v1/object/public/imagelist/WarlockBadge.png',
      alt: 'Warlock',
    },
    {
      url: 'https://msmssgqxmfnvrockxuzx.supabase.co/storage/v1/object/public/imagelist/insane_skelly.jpg',
      alt: 'Soon',
    },
  ];

const avatarStyles = {
  width: 120, 
  height: 96,
}

const cellStyles ={
  border:0,
  p:0
}

function createData(class1, class2, class3, index) {
  return { class1, class2, class3, key: `${index}-${class1.alt}` };
}

function ClassAva(alt,str,i){ //figure out if each avatar is on or blank
  return (
    ((str?.search(alt) >= 0 || str == 'ALL') && alt != 'Soon') ? 
    <Tooltip title={alt} followCursor TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
    <Avatar alt={alt} src ={SRC[i].url} sx={{...avatarStyles,border:'1px black solid'}}/>
    </Tooltip> : 
    <Skeleton variant="circular" sx={{...avatarStyles,border:'1px black groove'}} />
  );
};


export default function ClassComp(STR) {
  const rows = [  createData(ClassAva(SRC[0].alt,STR.STR.classComp,0), ClassAva(SRC[1].alt,STR.STR.classComp,1), ClassAva(SRC[2].alt,STR.STR.classComp,2), 0),
  createData(ClassAva(SRC[3].alt,STR.STR.classComp,3), ClassAva(SRC[4].alt,STR.STR.classComp,4), ClassAva(SRC[5].alt,STR.STR.classComp,5), 1),
  createData(ClassAva(SRC[6].alt,STR.STR.classComp,6), ClassAva(SRC[7].alt,STR.STR.classComp,7), ClassAva(SRC[8].alt,STR.STR.classComp,8), 2)
  ];
  

  return (
    <TableContainer sx={{zIndex:0}}>
      <Table sx={{ width: 100, height:290 }} size="small" aria-label="a dense table">
        <TableBody>
        {rows.map((row, index) => (
          <TableRow
            key={`row-${index}-${row.class1.alt}`}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="center" sx={{...cellStyles,pl:1}}>{row.class1}</TableCell>
            <TableCell align="center" sx={{...cellStyles}}>{row.class2}</TableCell>
            <TableCell align="center" sx={{...cellStyles}}>{row.class3}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

