import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import QRCode from 'qrcode';
import { Box, Button, Stack, Typography,Link} from '@mui/material';
import SkullBox from 'components/SkullBox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Footer from 'components/Footer';

const logo = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/jesus-christ-kid.gif";

export default function playground() {
    return(
        <Box sx={{width:'100%','@media (max-width: 767px)': {width:'100vh'} }}>
            <SkullBox name="calc"/>
            <Box sx={{width:'100%', border:'1px solid white',display: 'flex', justifyContent: 'center', alignItems: 'center',}}><Typography variant='h2'>(Popular) Questions and (Possible) Answers...</Typography></Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
            <List sx={{ width: '100%', width: 800, bgcolor: 'background.paper','@media (max-width: 767px)': {width:600} }}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={<Typography
          sx={{ display: 'inline' }}
          component="span"
          variant="h4"
          color="text.primary"
            >Are you in business with/related to Ironmace?</Typography>}
          
          
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="h6"
                color="text.primary"
              >
                This site has been created by Soulheart Sutler, which is entirely independent of Ironmace.
                There is no coordination/deal with Ironmace over this site, its only reason for existence is to make tradng easier for players.
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={<Typography
          sx={{ display: 'inline' }}
          component="span"
          variant="h4"
          color="text.primary"
            >Why do you need my email?</Typography>}
          
          
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="h6"
                color="text.primary"
              >
                At the moment its my only way to try and weed out trolls and fake listings. I would like to use something more concrete but at the very least need the game back on Steam before I try anything...
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={<Typography
          sx={{ display: 'inline' }}
          component="span"
          variant="h4"
          color="text.primary"
            >Website look like hot doodoo... when you fix?</Typography>}
          
          
          secondary={
            
            <React.Fragment>
                
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="h6"
                color="text.primary"
              >
                As quickly as possible T^T I have a full time job and multiple personal responsibilities so I apologize in advance if anything goes uncorrected for extended periods of time. Just want my fellow lineholders to have the best. Email me if you have suggestions or see anything out of place.
              </Typography>
              
            </React.Fragment>
          }
        />
        <Box sx={{pl:1,pt:2}}><img src={logo}/></Box>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
        <ListItemText
          primary={<Typography
          sx={{ display: 'inline' }}
          component="span"
          variant="h4"
          color="text.primary"
            >How can I contribute to the cause?</Typography>}
          
          
          secondary={
            
            <React.Fragment>
                
                <Typography sx={{ display: 'inline' }} component="span" variant="h6" color="text.primary">
              Please feel free to email me at support@pitchblack.market if you see anything different. If it's about item details, please provide a screenshot for verification.
              I also have a Patreon open at <Link href="https://www.patreon.com/PitchBlackMarket">patreon.com/PitchBlackMarket</Link> if you feel generous (and I very much appreciate you!)
            </Typography>
              
            </React.Fragment>
          }
        />
        </ListItem>
        <Divider variant="inset" component="li" />
    </List>
    </Box>
        
        <Footer />
        </Box>
        );

}