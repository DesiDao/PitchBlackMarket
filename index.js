import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Box from '@mui/material/Box';
import BasicCard from '/components/sell_order';
import React,{ useEffect, useState } from 'react';
import SkullBox from 'components/SkullBox';
import MsgBox from 'components/MsgBox.js';
import Footer from 'components/Footer.js';
import { Stack } from '@mui/material';
import generateQRCodeImage from 'components/QrGenerator.js';
import OrderList from 'components/supaCaller.js';

export default function Index() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [sell_offers, setSellOffers] = useState(null);
  const [Fav, setFav] = useState(null);
  const [loading, setLoading] = useState(false)
  const [updatedFavList, setUpdatedFavList] = useState(null);
  const logo = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/-.png";
  const bgBox ={
    display: 'flex',
    flexDirection: 'column',
    height:'100%',
    border: '1px solid white',
    backgroundColor:'black',
    '@media (max-width: 767px)': {width:'100vh'},
  };

  return (
    <Box sx={{display:'flex',flexDirection:"column"}}>
    <Box sx={{...bgBox}}>
      <SkullBox name="main"/>
      <Box sx={{display:'flex',flexDirection:"row",'@media (max-width: 767px)': {flexDirection:"column"}, height:'100%',backgroundColor: 'black', textAlign:'center'}}>
       <MsgBox />
        <OrderList PAGE={'Main'} USER={user} />
      </Box>
    </Box>
    <Stack direction='row'>
        
        
        <Footer />
      </Stack>
      
    </Box>
  );
}


