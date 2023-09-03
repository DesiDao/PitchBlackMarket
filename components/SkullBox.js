import Box from '@mui/material/Box';
import Nav from'./Nav.js';
import React,{ useEffect, useState } from 'react';
import SearchBar from 'components/SearchBar';
import spellLogo from './spellLogo.js';

export default function SkullBox(props) { 
  const bgBox ={
    display: 'flex',
    flexDirection: 'column',
    height:'100%',
    width: '100%',
    '@media (max-width: 767px)': {
      width: '100vh',
    },
  };

  const greetBox = {
    display: 'flex',
    flexDirection:'column',
    minWidth: '100%',
    alignItems:'center',
    justifyContent:'center',
    backgroundImage: "url('https://msmssgqxmfnvrockxuzx.supabase.co/storage/v1/object/public/imagelist/backgrounddancing.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    
  };
  const Image = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/" + props.name.replace(/ /g,'_') + ".png";
  function whichBox(str){
    if(props.name == 'main'){return<Box sx={{...greetBox, height: '600px'}}> <SearchBar /></Box>  }
    else if (props.name == 'calc'){return<Box sx={{...greetBox, height: '150px'}}> <SearchBar /></Box>  }
    else {return <Box sx={{...greetBox, height: '300px', position: 'relative'}}>   
      <Box sx={{position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)',}}>
      <SearchBar />
      </Box>
      <Box sx={{position: 'absolute', bottom: 0}}>
      <img src={Image} height='200px' />
      </Box>
      </Box>  
    }
  }

  const box = whichBox(props.name)
  return (
    <Box sx={{...bgBox}}>
        <Nav />
        
        {box}
    </Box>
  );
}

    