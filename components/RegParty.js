import React, { useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import {Table,TableBody,TableCell,TableContainer,TableRow} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Button, Fade, Stack, TextField, Tooltip, Typography,Skeleton,FormControl,Select, MenuItem, InputAdornment, Link } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import RefreshIcon from '@mui/icons-material/Refresh';

const dict = {
  'Barbarian': process.env.NEXT_PUBLIC_SUPABASE_URL+'/storage/v1/object/public/imagelist/BarbarianBadge.png',
  'Cleric': process.env.NEXT_PUBLIC_SUPABASE_URL+'/storage/v1/object/public/imagelist/ClericBadge.png',
  'Fighter': process.env.NEXT_PUBLIC_SUPABASE_URL+'/storage/v1/object/public/imagelist/FighterBadge.png',
  'Ranger': process.env.NEXT_PUBLIC_SUPABASE_URL+'/storage/v1/object/public/imagelist/RangerBadge.png',
  'Rogue': process.env.NEXT_PUBLIC_SUPABASE_URL+'/storage/v1/object/public/imagelist/RogueBadge.png',
  'Wizard': process.env.NEXT_PUBLIC_SUPABASE_URL+'/storage/v1/object/public/imagelist/WizardBadge.png',
  'Bard': process.env.NEXT_PUBLIC_SUPABASE_URL+'/storage/v1/object/public/imagelist/BardBadge.png',
  'Warlock': process.env.NEXT_PUBLIC_SUPABASE_URL+'/storage/v1/object/public/imagelist/WarlockBadge.png'
};

const avatarStyles = {
  width: 117,
  height: 150,
};

const cellStyles = {
  border: 0,
  p: 0
};

export default function RegParty(STR) {
  const OG= STR.STR
  const str = OG.split('/');

  const [clicked, setClicked] = useState(Array(10).fill(false));//same
  const [temp, setTemp] = useState(Array(10).fill(''));
  const [delSelected, setdelSelected] = useState(Array(10).fill(false));//doesnot need to b array, =i
  const [selectMade, setSelect] = useState(false);
  const [newToon, setNew] = useState(null);
  const [newToonC, setNewC] = useState(' ');
  const supabase = useSupabaseClient();
  const user = useUser();


  function updateReg(i) {
    setClicked(prevState => {
      const newState = Array(10).fill(false);
      newState[i] = !prevState[i];
      if (str[i] || !str[i]?.split(',')[0] === null || !str[i]?.split(',')[0] === "") {setSelect(newState[i])}else{setSelect(newState[false])}
      setNew(null);
      setNewC(' ');
      return newState;
    });
  }

  function updateAdv(i) {
    let temp = OG.split('/')
    console.log(temp)
    temp[i] = 'HI'
    console.log(temp.toString())
    
  }

  async function updateDel(i){
    console.log(str)
   if (delSelected[i]==true){
    
    let temp = str[i].split(',')[0]
    console.log(temp)
    try {
      const { data: sellOffers, error } = await supabase
        .from('sell_offers')
        .select('*')
        .eq('available', true)
        .eq('soldBy', temp)
        .eq('id', user.id);
      if (error) throw error;
      console.log('Offers',sellOffers)
      for (const offer of sellOffers) {
        const { error } = await supabase.from('sell_offers').update({ available: false }).eq('offerID', offer.offerID).eq('id', user.id);
        if (error) throw error;
      }

      console.log('Sell offers updated successfully');
    } catch (error) {
      console.log(error);
    }finally{
      addNewAdv(OG.replace(str[i]+'/',''));
    }
  }else{
    setdelSelected(prevState => {
      const newState = Array(10).fill(false);
      newState[i] = !prevState[i];
      return newState;
    });}
  }

  async function addNewAdv(str) {
    try {
        const updates = {
          id: user.id,
          regAdv: str
        }
  
        let { error } = await supabase.from('profiles').upsert(updates)
        if (error) throw error
        //alert('Signed in successfully!')
      } catch (error) {
        //alert('Error signing you in!')
        console.log(error)
      } finally {
        location.reload();
      }
  }
  
  function ClassAva(i) {
    if (!str[i] || str[i].split(',')[0] === null || str[i].split(',')[0] === "") {
      return (
        <Stack>
          
          <Box sx={{ backgroundColor: 'grey.700', height:'215px',border:'1px black solid' }}>
            {clicked[i] === false ? (
              <Tooltip title="Click to register!" followCursor TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
                <Button size="small" disabled={STR.SELF} onClick={() => updateReg(i)}>
                  <Skeleton variant="circular" sx={{ ...avatarStyles, border: '1px black solid' }} />
                </Button>
              </Tooltip>
            ):(
              
              <Stack> 
                <Box sx={{height:'5px',width:'127px'}}></Box>
              
                <Button disabled={newToon == null || newToonC == null || newToon == '' || newToonC == ''|| newToonC == ' '|| newToon == ' '} size="small" variant="contained" onClick={() => addNewAdv(OG+newToon+','+newToonC+',0/')}>
                  REGISTER
                </Button>
                <Box sx={{height:'10px'}}></Box>
                <Button size="small" variant="contained" color="error" onClick={() => updateReg(i)}>
                  CANCEL
                </Button>
                <Box sx={{height:'20px'}}></Box>
              </Stack>
            )}
            
            <Stack sx={{ backgroundColor: 'grey.300'}}>
              <FormControl>
              {clicked[i] ? (
              <TextField
                color="success"
                id="outlined-disabled"
                label='Name'
                fullWidth
                value={newToon?newToon:''}
                onChange={(event) => {
                  setNew(event.target.value);
                }}
              />):
              <TextField
                InputProps={{
                  readOnly: true
                }}
                color="error"
                id="outlined-disabled"
                fullWidth
                label={STR.SELF?'':"**ADD NEW**"}
                />}
              
              {clicked[i] ? (
                <Box>
                <Box sx={{height:'5px'}}></Box>
                <TextField
                  color={clicked[i]?"success":"error"}
                  id="outlined-disabled"
                  select
                  label="Class"
                  fullWidth
                  onChange={(event) => {
                    setNewC(event.target.value);
                    console.log(newToonC)
                  }}
                >
                  {Object.keys(dict).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                  
                </TextField></Box>
              ) : null}</FormControl>
            </Stack>
          </Box>
        </Stack>
      );
    } else {//has info
      return (
        <Stack>
          
          <Box >
            {clicked[i] === false ? (
                <Tooltip title={`${str[i].split(',')[0]}: ${str[i].split(',')[2]} items listed`} followCursor TransitionComponent={Fade} TransitionProps={{ timeout: 300 }} placement="top">
                  <Button disabled={STR.SELF} size="small" onClick={() => updateReg(i)}>
                    <Avatar alt={str[i].split(',')[0]} src={process.env.NEXT_PUBLIC_SUPABASE_URL+`/storage/v1/object/public/imagelist/${str[i].split(',')[1]}Badge.png`} sx={{ ...avatarStyles, border: '1px white solid' }} />
                  </Button>
                </Tooltip>
              ):(
                
                <Stack sx={{pt:3.75}}> 
{/*                   <Button size="small" variant="contained" onClick={() => updateAdv(i)}>
                    UPDATE
                  </Button> */}
                  <Box sx={{height:'5px'}}></Box>
                  <Button size="small" variant="contained" onClick={() => updateDel(i)}> {/* addNewAdv(OG.replace(str[i]+'/','')) */}
                    {delSelected[i]?  'SURE?' : 'DELETE'}
                  </Button>
                <Box sx={{height:'5px'}}></Box>
                  <Button size="small" variant="contained" color="error" onClick={() => updateReg(i)}>
                    CANCEL
                  </Button>
                </Stack>
              )}
            
            <Stack sx={{ backgroundColor: 'grey.300' }}><FormControl>
              
              <TextField
                InputProps={{
                  readOnly: !clicked[i],
                }}
                color={clicked[i]?"success":"error"}
                id="outlined-disabled"
                value={str[i]?str[i]?.split(',')[0]:'Loading'}
                fullWidth
              /></FormControl>
              <FormControl>{clicked[i] ? (
                <TextField
                  fullWidth
                  color={clicked[i]?"success":"error"}
                  id="outlined-disabled"
                  label="Class"
                  select
                  value={str[i]?str[i]?.split(',')[1]:'Loading'}
                >{Object.keys(dict).map((option) => (
                  <MenuItem key={option} value={option} fullWidth>
                    {option}
                  </MenuItem>
                ))}</TextField>
              ) : null}</FormControl>
            </Stack>
          </Box>
        </Stack>
      );
    }
  }
  return (
    <Box>
      <Stack direction="row" sx={{ pb: 1 }}>
        <Typography variant="h4" color="white">Registered Adventurers</Typography>                   
        {selectMade?<Button variant="contained" color="error"><PersonRemoveIcon /><Typography variant="h6">  DELETE</Typography></Button>:null}
      </Stack>
      
      <Box sx={{ zIndex: 0 }}>
        
        <Table sx={{ width: 500, height: 300 }} size="small" aria-label="a dense table">
          <TableBody>
            <TableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" sx={{ ...cellStyles, pl: 1 }}>{ClassAva(0)}</TableCell>
              <TableCell align="center" sx={{ ...cellStyles }}>{ClassAva(1)}</TableCell>
              <TableCell align="center" sx={{ ...cellStyles }}>{ClassAva(2)}</TableCell>
              <TableCell align="center" sx={{ ...cellStyles }}>{ClassAva(3)}</TableCell>
              <TableCell align="center" sx={{ ...cellStyles }}>{ClassAva(4)}</TableCell>
            </TableRow>
            <TableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" sx={{ ...cellStyles, pl: 1 }}>{ClassAva(5)}</TableCell>
              <TableCell align="center" sx={{ ...cellStyles }}>{ClassAva(6)}</TableCell>
              <TableCell align="center" sx={{ ...cellStyles }}>{ClassAva(7)}</TableCell>
              <TableCell align="center" sx={{ ...cellStyles }}>{ClassAva(8)}</TableCell>
              <TableCell align="center" sx={{ ...cellStyles }}>{ClassAva(9)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      
    </Box>
  );
}
