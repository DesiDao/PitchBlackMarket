import { useState, useEffect, cloneElement } from 'react'
import { styled } from "@mui/material/styles";
import {Box, Tooltip, Fade, TextField,Link} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ShoppingCartRounded, StarOutlined, ConnectWithoutContactRounded, BookmarkBorderRounded, StoreRounded, ShareRounded, BookmarkAddOutlined } from '@mui/icons-material';

const rarity = {
  "Poor" : ['#646464'],
  "Cracked" : ['#646464'],
  "Common": ['#DEDEDE'],
  "Flawed": ['#DEDEDE'],
  "Uncommon" : ['#00A300'],
  "Normal" : ['#00A300'],
  "Rare" : ['#0047AB'],
  "Exquisite" : ['#0047AB'],
  "Epic": [	'#6C0BA9'],
  "Perfect": [	'#6C0BA9'],
  "Legendary":['#DAA520'],
  "Royal":['#DAA520'],
  "Unique":['#E3D88C'],
  "Named":['#E3D88C'],
  "Cobalt":['#00008B'],
  "Rubysilver":['#8B0000']
};

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

export default function FAVList(props) {
  //console.log(props)
  const [Ref,setbaseRef] = useState(null);
  const [selected,setSelect] = useState(null);

  async function updateFavDB(FAV) {
    console.log(FAV.toString());
    let temp = null
    if (Ref != null){
      setbaseRef(Ref.replace('/'+FAV,''));

    }else{setbaseRef(`000/`+props.fav.filter(item => item.offerID !== FAV.toString()).map(entry => entry.offerID).join('/').replace('/'+FAV,''))};
  try {
    const F = {
      id: props?.USER.id,
      fav: Ref == null?`000/`+props.fav.filter(item => item.offerID !== FAV.toString()).map(entry => entry.offerID).join('/'):Ref.replace('/'+FAV,'')
    }
    let {error } = await props?.CLIENT.from('profiles').upsert(F)
    if (error) {
      throw error;
    }
  } catch (error) {
    alert('Error updating the data!');
    console.log(error);
  } 
  }
  function handleSelected(str) {
    selected == str? setSelect(null):setSelect(str);
  }
  
  useEffect(() => {
  }, []);

  function generate() {
    const temp= (Ref == null)?props.fav.slice().sort((a, b) => a.itemName.localeCompare(b.itemName)):props.fav.filter(item => Ref.indexOf(item.offerID) > -1);
    //console.log(temp)
    return temp.map((elem, index) => (
      <ListItem
        key={elem?.offerID} // Make sure to add a unique key to each item
        secondaryAction={
          props.favRef !== 'other' && (
            <Tooltip title="Delete" placement="top" followCursor TransitionComponent={Fade} TransitionProps={{ timeout: 300 }} onClick={() => {updateFavDB(elem.offerID);}}>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )
        }
        
        sx={{minHeight: 75, borderBottom:'1px solid black', borderLeft:`10px solid ${rarity[elem.rarity]}`}}
      >

        <Box minWidth={50} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
        {elem && (
          <img
            height='50px'
            src={process.env.NEXT_PUBLIC_SUPABASE_URL + `/storage/v1/object/public/imagelist/${elem.itemName.replace(/ /g, "_")}.png`}
            alt={elem.itemName}
          />
        )}
        </Box>
        <ListItemText
          primary={<Box display='flex' flexDirection='row'>
            
          <Box sx={{width:'60%'}}>  <Typography variant='h5' color={'black'}>{elem ? elem.itemName: 'N/A'}</Typography>  </Box>
          {selected != elem.offerID? <Link  underline ={props.favRef != "other" ?'always':'none'} href={props.favRef != "other" ?`/merchant?ID=${elem.id.id}`:null} target='_blank' ><Typography variant='h5' color={'black'}>{props.favRef != "other" ? elem.id.username : elem.soldBy}</Typography></Link>:<TextField
          id="outlined-read-only-input"
          label="Paste This In Discord DM"
          defaultValue= {`Hail ${props.favRef != "other" ? elem.id.username : elem.profiles.username}! I'm looking for a(n) [${elem.itemName}] that you are selling for ${elem.price}g, does [${elem.soldBy}] still have it? -- Referred from PitchBlack -- [${elem.itemName}] ${elem.en1 ? elem.en1:''}${elem.en2 ? '/' +elem.en2:''}${elem.en3 ? '/' +elem.en3:''}${elem.en4 ? '/' +elem.en4:''}${elem.en5 ? '/' +elem.en5:''}`}
          variant="filled"
          InputProps={{
            readOnly: true,
          }}
        />}</Box>}
          secondary={elem &&`${elem.en1 != null && elem.en1 != '' ?elem.en1 : ''}`+
          `${elem.en2 != null && elem.en2 != '' ? '/' + elem.en2 : ''}`+
          `${elem.en3 != null && elem.en3 != '' ? '/' + elem.en3 : ''}`+
          `${elem.en4 != null && elem.en4 != '' ? '/' + elem.en4 : ''}`+
          `${elem.en5 != null && elem.en5 != '' ? '/' + elem.en5 : ''}`}
        />
        <Tooltip title="Purchase" placement="top" followCursor TransitionComponent={Fade} TransitionProps={{ timeout: 300 }} onClick={() => {handleSelected(elem.offerID);}}>
          <IconButton edge="end" aria-label="View">
            <ShoppingCartRounded />
          </IconButton>
        </Tooltip>
        <Tooltip title="Similar" placement="top" followCursor TransitionComponent={Fade} TransitionProps={{ timeout: 300 }}>
          <IconButton edge="end" aria-label="Similar" href={`/pedestal/${elem?.itemName}?offerID=${elem?.offerID}`}>
            <StoreRounded />
          </IconButton>
        </Tooltip>
      </ListItem>
    ));
  }
  
  return (
    <Box sx={{ minWidth: '700px','@media (max-width: 767px)': {minWidth: '600px'},}}>
      <Grid>
        <Demo>
        <List sx={{ maxHeight: 440, overflowY: 'auto' }}>
            {props?.fav&&Ref!='000'? generate():<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}><Typography variant='h5' color='black'> None Registered...</Typography></Box> }
          </List>
        </Demo>
      </Grid>
    </Box>
  );
}

