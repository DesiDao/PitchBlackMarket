import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Box, Button, Typography } from '@mui/material';
import { CompassCalibration } from '@mui/icons-material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';

export default function MinmaxSlot(props) {
    const mbonus= props?.miscBonus? props.miscBonus: 0;
    const [addBonus, setAddBonus] = useState(0);
    const [curValue, setCurValue] = useState(props.curValue);
    const [curBonus, setCurBonus] = useState(calculateInteger( props.curValue));//setCurBonus(calculateInteger( curValue));
    const totalBonus = parseInt(props.curValue) + addBonus + mbonus;
    
    function incValue(str){
        if (str == '-'){setAddBonus(addBonus-1);}else{setAddBonus(addBonus+1);};
    }

    function calculateInteger(curValue) {
        
        const sets = props.str.split('//');
        
        let value = parseInt(sets[0].split('/')[0]);//console.log('Initial Value:', value);
        let bonus = parseFloat(sets[0].split('/')[1]);//console.log('Initial Bonus:', bonus);
        //console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////');


        for (let counter = 1; counter < sets.length; counter++) {
          const values = sets[counter].split('/');
          //console.log('Starting set:',counter, 'using pair:',values);
          const nextGoal = parseInt(values[0]);//console.log('I have a new goal!', nextGoal);
          const increment = parseFloat(values[1]);//console.log('Increasing current bonus by:', increment);
          
          while(value < nextGoal && value < curValue){bonus = bonus + increment;value++;}
          if (value == curValue){if (bonus % 1 !== 0) {return bonus.toFixed(1);} else {return bonus;}};
          //console.log('Set:', counter, '// Bonus:', bonus, '// Modifier:', value);
          //console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////');
        }
      
      }
      setTimeout(() => {}, 500);
    return(
        
        <Box display='flex' sx={{border:'1px solid grey', borderLeft: `8px solid ${props.color}`,width:'570px',m:0,p:0}}>
        
        <Box sx={{width:'250px'}}><Typography variant='h5'> {props.name}</Typography></Box>
        <Box sx={{width:'50px'}}><Typography variant='h5'>{props.curValue}</Typography></Box>
        <Box sx={{width:'35px'}}><Typography variant='h5'>{addBonus+mbonus}</Typography></Box>

        <Box display='flex' flexDirection='column'>
            <Button variant='contained' sx={{ width:'10px', height: '12px', mt:.5, mb: .25, mx:.5 }} onClick={() => {
            incValue('+');
        }}>+</Button>
            <Button variant='contained' sx={{ width:'10px', height: '12px', mt:.25, mb: .5, mx:.5 }} onClick={() => {
            incValue('-');
        }}>-</Button>
        
        </Box>
        <Box sx={{width:'35px', display: 'flex', justifyContent: 'flex-end' }}><Typography variant='h5'>{totalBonus}</Typography></Box>
        <Box sx={{ flex: '1', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            
            <Box sx={{width:'55px' }}><Typography variant='h5'>{'=>'}</Typography></Box>
            <Box sx={{width:'35px', display: 'flex', justifyContent: 'flex-end', }}><Typography variant='h5'>{calculateInteger(totalBonus)}</Typography></Box>
        </Box>
        </Box>
        
        );

}