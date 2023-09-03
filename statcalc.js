import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import {Box,Tooltip,Fade} from '@mui/material';
import Typography from '@mui/material/Typography';
import BasicCard from '/components/sell_order';
import PrimarySearchAppBar from'../../components/Nav.js';
import supabase from '@/utils/supabaseClient';
import React,{ useEffect, useState } from 'react';
import SkullBox from 'components/SkullBox';
import MsgBox from 'components/MsgBox.js';
import Footer from 'components/Footer.js';
import { Stack, Button, Grid } from '@mui/material';
import ClassAva from 'components/ClassAva.js';
import MinmaxSlot from 'components/MinMaxSlot';
import SlotDisplay from 'components/SlotDisplay.js';


export default function statcalc(){
    const supabase = useSupabaseClient();
    const user = useUser();
    const [attr, setAttr] = useState(null);
    const [classInfo, setInfo] = useState(null);
    const [skinInfo, setSkin] = useState(null);
    const [Strength,setStr] = useState(0);
    const [Will,setWil] = useState(0);
    const [Agility,setAgi] = useState(0);
    const [Knowledge,setKno] = useState(0);
    const [Resourcefulness,setRes] = useState(0);
    const [tempStrength,setTStr] = useState(0);
    const [tempWill,setTWil] = useState(0);
    const [tempAgility,setTAgi] = useState(0);
    const [tempKnowledge,setTKno] = useState(0);
    const [tempResourcefulness,setTRes] = useState(0);
    const [selected,setSel] = useState(null);
    const [selectedSkin,setSelSkin] = useState(null);
    const [startGear,setGear] = useState(null);
    const [miscBonus, setMiscBonus]  = useState(null);
    async function getAttr() {
        try {
          let { data:Attr, error} = await supabase
            .from('attrStats')
            .select(`*`)
    
          if (error) {
            throw error
          }else{
            setAttr(Attr)
          }
        } catch (error) {
          console.log(error)
        } finally {

        }
      }
      async function getcInfo() {
        try {
          let { data: ALLinfo, error } = await supabase
            .from('classInfo')
            .select('*');
      
          if (error) {
            throw error;
          } else {
            const cosmeticData = [];
            const nonCosmeticData = [];
      
            ALLinfo.forEach(entry => {
              if (entry.cosmetic) {
                cosmeticData.push(entry);
              } else {
                nonCosmeticData.push(entry);
              }
            });
            setInfo(nonCosmeticData);
            setSkin(cosmeticData);
          }
        } catch (error) {
          console.log(error);
        }
      }
      
    function update(str) {
        const classData = classInfo.find(item => item.name === str);
        if (selected == str){
          setStr(0);
          setAgi(0);
          setWil(0);
          setKno(0);
          setRes(0);
          setSel(null);
          setGear(null);
          return;
        }
        if (classData) {
          setStr(classData.stats.split('/')[0]);
          setAgi(classData.stats.split('/')[1]);
          setWil(classData.stats.split('/')[2]);
          setKno(classData.stats.split('/')[3]);
          setRes(classData.stats.split('/')[4]);
          setSel(classData.name);
          setGear(classData.gear);
          return;
        }
        const  skinData = skinInfo.find(item => item.name === str);
        if (skinData) {
          setTStr(0);setTWil(0);setTAgi(0);setTKno(0);setTRes(0);setMiscBonus(null);
          if (selectedSkin==skinData.name){setSelSkin(null);return;};
          setSelSkin(skinData.name);
          if (skinData.skills.search('Base ')>-1){
          eval(`setT${skinData.skills.replace('Base ','').split('/')[0].substring(0,3)}(1)`)
          eval(`setT${skinData.skills.replace('Base ','').split('/')[1].substring(0,3)}(-1)`)
          return;
          }else{setMiscBonus(skinData.skills)};
        }
      }
    useEffect(() => {
        if (attr == null) {getAttr();}
        if (classInfo == null) {getcInfo();}
    }, [attr, classInfo, startGear]);

    const classSwitch = classInfo ? (
      <Box sx={{width:'500px'}}><Grid container spacing={2}>
        {classInfo.map(item => (
          <Grid item xs={6} sm={6} md={4} lg={4} key={item.name}>
            <Tooltip title={item.name} followCursor TransitionComponent={Fade} >
            <Button
              key={item.name}
              variant={selected==item.name?'contained':'outlined'}
              color={ tabColor(item.stats)}
              onClick={() => update(item.name)}
              fullWidth
            >
              <ClassAva alt={item.name} str={item.name} />
            </Button>
            </Tooltip>
          </Grid>
        ))}
      </Grid></Box>
    ) : null;

    const skinSwitch = skinInfo ? (
      <Box sx={{width:'500px'}}><Grid container spacing={2}>
        {skinInfo.map(item => (
          <Grid item xs={6} sm={6} md={4} lg={4} key={item.name}>
            <Tooltip title={item.name} followCursor TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
            <Button
              key={item.name}
              variant={selectedSkin==item.name?'contained':'outlined'}
              color={ tabColor(item.stats)}
              onClick={() => update(item.name)}
              fullWidth
            >
              <ClassAva alt={item.name} str={item.name} />
            </Button>
            </Tooltip>
          </Grid>
        ))}
      </Grid></Box>
    ) : null;
      
      function tabColor(str){
        const temp = str.split('/')
        let maxIndex = 0;
        let maxValue = 0;

        for (let i = 0; i < temp.length; i++) {
          if (parseInt(temp[i]) > maxValue) {
            maxValue = parseInt(temp[i]);
            maxIndex = i;
          }
        }

        switch(maxIndex) {
          case 0:
            return 'error';
          case 1:
            return 'success';
          case 2:
            return 'secondary';
          case 3:
            return 'info';
          case 4:
            return 'warning';
        }
      }

      function findCurValue(str){
        switch(str) {
          case 'Strength':
            return Number(Strength) + Number(tempStrength);
          case 'Agility':
            return Number(Agility) + Number(tempAgility);
          case 'Will':
            return Number(Will) + Number(tempWill);
          case 'Knowledge':
            return Number(Knowledge) + Number(tempKnowledge);
          case 'Resourcefulness':
            return Number(Resourcefulness) + Number(tempResourcefulness);
          default:
            return 0;
        }
        return 0; 
      }
      const colorDic = {
        'Strength':'#8B0000',
        'Knowledge':'#0047AB',
        'Agility':'#00A300',
        'Will':'#6C0BA9',
        'Resourcefulness': '#DAA520',
        'Physical Damage Reduction': 'white'

      }
      function filterAttr(MISC, NAME){
        if (MISC?.indexOf(NAME) > -1){
          let temp = (MISC.split('/')[0].indexOf(NAME) > -1)? parseInt(MISC.split('/')[0].replace(' '+NAME,'')):parseInt(MISC.split('/')[1].replace(' '+NAME,''));
          return temp;
        }
      }
      const attrList = attr ? attr.map((item,index) => (
        <MinmaxSlot miscBonus={filterAttr(miscBonus,item.name)} name={item.name} str={item.variable} color={colorDic[item.associated]} curValue={findCurValue(item.associated)} key={item.name} />
      )) : null;//if the item name is equal to miscBonus
      //console.log(attr)
      
      function attrBox(value,str){
        return (
        <Box sx={{border:'1px white solid', minWidth:'88px', textAlign:'center'}}>
          <Typography variant='h5' color={colorDic[str]}>{str}</Typography>
          <Typography variant='h5'>{value}</Typography>
        </Box>);
      }
      function sortJSON(json) {
        // Convert JSON keys to integers and sort them
        const sortedKeys = Object.keys(json).map(Number).sort((a, b) => {
          const nameA = json[a].name.toUpperCase();
          const nameB = json[b].name.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      
        // Rebuild the JSON object in alphabetical order
        const sortedJSON = {};
        sortedKeys.forEach((key) => {
          sortedJSON[key] = json[key];
        });
      
        return sortedJSON;
      }
      const sortedJSON = sortJSON({attr});
      //console.log(attr);
      //console.log(classInfo);
      const curAgility = Number(Agility) + Number(tempAgility);
    return(
        <Box display='flex'  flexDirection='column'>
        <SkullBox name="calc"/>
        <Box sx={{width:'100%',display: 'flex',
        justifyContent: 'center', // Center the content horizontally
        alignItems: 'center',}}><Typography variant="h3">This page is still being completed! Skills and spells upcoming, and will soon allow custom builds to be created and shared. Waiting for stats to settle in-game... - SS</Typography></Box>
        <Box display='flex'>
        <Box >
        {classSwitch}
        <Box sx={{pb:1}}>       ____________________________________________________</Box>
        {skinSwitch}
        </Box>
        <Box sx={{minWidth:'20px'}}></Box>
        <Box><SlotDisplay SLOT={''} gear={startGear?startGear:' / / / / / / / / / / / / / / / '}/></Box>
        <Box sx={{minWidth:'20px'}}></Box>
        <Box><Box display='flex' fullWidth>
        {attrBox(Number(Strength) + Number(tempStrength), 'Strength')}
        {attrBox(Number(Agility) + Number(tempAgility), 'Agility')}
        {attrBox(Number(Will) + Number(tempWill), 'Will')}
        {attrBox(Number(Knowledge) + Number(tempKnowledge), 'Knowledge')}
        {attrBox(Number(Resourcefulness) + Number(tempResourcefulness), 'Resourcefulness')}
        </Box>{attrList}</Box>
        </Box>
        <Footer />
        </Box>
    );

}