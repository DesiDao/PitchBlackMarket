import supabase from '@/utils/supabaseClient';
import React,{ useEffect, useState } from 'react';
import {Box,Stack,Typography, Link} from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const footbox ={
    display: 'flex',
    flexDirection: 'column',
    //border: '1px solid white',
    backgroundColor:'black',
    width:'49.5%'
  };
  const logo = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/-.png";
  const PATREON = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/PBPatreon.png";
export default function Footer() {

    return(
    <Box sx={{width:1,display:'flex',flexDirection:"row",flexWrap:'wrap',gap:'1px', backgroundColor:'grey.800'}}> 
        <Box sx={{...footbox}}>
            
            <Stack direction={'row'}>
            <Stack direction={'column'}>
            <Stack direction={'row'} spacing={13}>
              <Link href='/faq' target="_blank">FAQ</Link> {/* <Link>Contact Me</Link> <Link>ToS</Link> */}
            </Stack>
            <Typography>DISCLAIMER</Typography>
            <Typography>Ironmace, Dark and Darker and the logo Dark and Darker are registered trademarks. All rights are reserved worldwide. This site has no official link with Ironmace or Dark and Darker. 
                All artwork, screenshots, characters or other recognizable features of the intellectual property relating to these trademarks are likewise the intellectual property of Ironmace. Do not come 
                after me, I aint got nuttin
                </Typography>
                </Stack>
            </Stack>
        </Box>
        
        <Box sx={{ ...footbox, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ maxWidth: '70%', textAlign: 'center' }}>
            <Link href={'https://patreon.com/PitchBlackMarket'} target="_blank"><img src={PATREON} style={{ maxWidth: '100%', width: 'auto', height: 'auto' }} /></Link>
        </Box>
        </Box>
    </Box> 
    );
}