import * as React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import YoutubeSearchedForOutlinedIcon from '@mui/icons-material/YoutubeSearchedForOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { amber } from '@mui/material/colors';

export default function DeetsTable(props) {
  const [slotClick, setSlotClick] = useState(false);
  const [shopClick, setShopClick] = useState(false);

  function changeShop() {
    setShopClick(prevShopClick => !prevShopClick);
    props.onShopClickStatusChange(!shopClick);
  }
  return (
    <Box sx={{ width: '100%', maxWidth: 200, backgroundColor:'black',zIndex:1}}>
        <List sx={{pt:0}}>
          <ListItem disablePadding>
            <ListItemButton sx={{backgroundColor:'grey',height:60}}>
              <ListItemIcon>
                <BadgeOutlinedIcon sx={{ color: amber[500], fontSize:30 }}/>
              </ListItemIcon>
              <ListItemText primary={props.item.itemName} />
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem disablePadding>
            <ListItemButton sx={{height:60}} >
              <ListItemIcon>
                <PanToolOutlinedIcon sx={{ color: amber[500], fontSize:30 }}/>
              </ListItemIcon>
              <ListItemText primary={props.item.hand} />
            </ListItemButton>
          </ListItem>

          <Divider />
            
          <ListItem disablePadding>
            <ListItemButton sx={{backgroundColor:'grey',height:60}}>
              <ListItemIcon>
                <CategoryOutlinedIcon sx={{ color: amber[500], fontSize:30 }}/>
              </ListItemIcon>
              <ListItemText primary={props.item.cat} />
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem disablePadding>
            <ListItemButton sx={{height:60}} onClick={props.item.soldBy=='Loot-able'||props.item.soldBy=='-'? null:changeShop}>
              <ListItemIcon>
                <StorefrontOutlinedIcon sx={{ color: amber[500], fontSize:30 }}/>
              </ListItemIcon>
              <ListItemText primary={shopClick? 'Cancel?':props.item.soldBy} />
              {shopClick||props.item.soldBy=='-'||props.item.soldBy=='Loot-able'? '':<ArrowForwardIosRoundedIcon sx={{ color: amber[500], fontSize:20 }}/>}
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem disablePadding>
            <ListItemButton sx={{backgroundColor:'grey',height:60}}>
              <ListItemIcon>
                <YoutubeSearchedForOutlinedIcon sx={{ color: amber[500], fontSize:30 }}/>
              </ListItemIcon>
              <ListItemText primary='Wiki Link' />
            </ListItemButton>
          </ListItem>

        </List>
      
    </Box>
  );
}