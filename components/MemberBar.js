import React,{ useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material';
import Popover from '@mui/material/Popover';

const coin=[
    {req:0,alt:"Clay",url: "clay_badge.png"},
    {req:1,alt:"Iron",url: "iron_badge.png"},
    {req:10,alt:"Bronze",url: "bronze_badge.png"},
    {req:50,alt:"Silver",url: "silver_badge.png"},
    {req:100,alt:"Gold",url: "gold_badge.png"},
    {req:1000,alt:"Black Gold",url: "black_gold.png"}
  ];
  
  const bgstat =<Typography sx={{fontSize:12 }}>~ Black Gold ~</Typography>;
  function getCoinValue(karma, i=0) {
    let highestReq = -1;
    let highestCoin = null;
    let nextCoin = null;
  
    for (const coinObj of coin) {
      
      if (karma >= coinObj.req && coinObj.req > highestReq) {
        highestReq = coinObj.req;
        highestCoin = coinObj;
      }else{
        nextCoin = coinObj;
        return (i==0)?highestCoin:nextCoin;
      }
      if (coinObj.alt == "Black Gold") {
        return highestCoin;
      }
    }

    return (i==0)?highestCoin:nextCoin;//[highestCoin, nextCoin, nextCoin.req]
  }

  export default function MemberBar(props){
    const [Karma, setKarma] = useState(props.karma);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showPopover, setShowPopover] = React.useState(false);
    const timerRef = React.useRef(null);
    const { alt, url } = getCoinValue(props.karma) || {};
    
    const handlePopoverOpen = (event) => {
      timerRef.current = setTimeout(() => setShowPopover(true), 800);
      setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
      clearTimeout(timerRef.current);
      setShowPopover(false);
      setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: props.status,
          color: props.status,
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: (props.status != '#BDBDBD'&&props.status != '#808080')?'ripple 2s infinite ease-in-out' : "",
            border: '.5px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple':{
            '0%': {
                transform: 'scale(.5)',
                opacity: 1,
              },
              '100%': {
                transform: 'scale(5)',
                opacity: 0,
              },
        }
      }));
      const karmaAV = (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          variant="dot"
        >
          {<Avatar alt={alt} src={props.avatar} sx={{ width: 50, height: 50 }} />}
        </StyledBadge>
      );
      let status
      switch(props.status){
        case '#00FF00':
          status = 'ONLINE'
          break
        case '#57B3C1':
          status = 'DM ONLY'
          break
        case '#BDBDBD': 
          status = 'OFFLINE'
          break
      }
      const screened = (props?.user.length < 17) ? props.user : props.user.substring(0,15)+'...'
      return (
        <Box sx={{ display: 'flex' }}>
          
            {screened}
          
           <Box sx={{display:'flex', position: 'relative', top:-10}}> &nbsp;{karmaAV} </Box>
        </Box>
      );
    }