import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import QRCode from 'qrcode';
import { Box, Button, Stack, Typography } from '@mui/material';
import { CompassCalibration } from '@mui/icons-material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import MinmaxSlot from 'components/MinMaxSlot';
import ClassComp from 'components/ClassComp';
import ClassAva from 'components/ClassAva';

export default function playground() {
    const supabase = useSupabaseClient();
    const [src,setSrc] = useState('');
    const [attr, setAttr] = useState(null);
    const [stat,setStat] = useState(2);
    
    const opts ={
        color:{
            dark:"#DAA520",
            light:"#2D3033"
        }
    }
    async function getAttr() {
      try {
        let { data, error} = await supabase
          .from('attrStats')
          .select(`*`)
  
        if (error) {
          throw error
        }else{
          setAttr(data)
        }
      } catch (error) {
      } finally {
      
      }
    }
    useEffect(() => {
      if (attr == null) {getAttr();}
    }, [attr]);
    const generate = () => {
        QRCode.toDataURL('http://10.0.0.14:3000/pedestal/Armet?offerID=84e8d945-f164-481e-9e1b-bce1593822c7',opts).then(setSrc);
    }
    
      const QRBUTTON= <Box>
      <img src={src} />
      <Button onClick={generate}>generate</Button></Box>

    return(
      <Box>
      {QRBUTTON}
      </Box>
        );

}