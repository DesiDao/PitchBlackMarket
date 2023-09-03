import React, { useEffect, useState } from 'react';
import supabase from '@/utils/supabaseClient';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Button, Card, CardContent, CardMedia, CardActions, List, Typography, Box, Link, Stack, Tooltip,TextField } from '@mui/material';
import { ShoppingCartRounded, StarOutlined, ConnectWithoutContactRounded, BookmarkBorderRounded, StoreRounded, ShareRounded, BookmarkAddOutlined } from '@mui/icons-material';
import MemberBar from './MemberBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import QRCode from 'qrcode';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Imprint MT Shadow',
      '"Helvetica Neue"',
      'EB Garamond',
      'Montserrat'
    ].join(','),
  },
});

const deetsBoxStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  borderTop: 0,
  textAlign: 'center',
  fontSize: 18,
  minWidth:'155px'
};

const rarity = {
  "Poor" : ['#646464',1],
  'Cracked': ['#646464',1],
  "Common": ['#DEDEDE',2],
  "Flawed": ['#DEDEDE',2],
  "Uncommon" : ['#00A300',3],
  "Normal" : ['#00A300',3],
  "Rare" : ['#0047AB',4],
  "Exquisite" : ['#0047AB',4],
  "Epic": [	'#6C0BA9',5],
  "Perfect": [	'#6C0BA9',5],
  "Legendary":['#DAA520',6],
  "Royal":['#DAA520',6],
  "Unique":['#E3D88C',7],
  "Named":['#E3D88C',0],
  "Cobalt":['#00008B',0],
  "Rubysilver":['#8B0000',0]
};



const BasicCard = React.memo(({ item ,fav, onUpdateFav, updatedFavList}) => {
  if (!item) {
    return null;
  }
  const user = useUser();
  const rarityTheme = rarity[item.rarity][0];
  const borderColor = `3px solid ${rarityTheme}`;
  const [Fav, setFav] = useState(updatedFavList || fav[0]?.fav|| null);
  const [isFav, setIsFav] = useState(Fav?.indexOf(item.offerID.toString()) > -1||null);
  const varList = (item?.varList?.desc === ""|| item?.varList?.cat != 'Jewelry')? [item.varList?.variable.split(' ')[rarity[item.rarity][1]].split('/')[0],item.varList?.variable.split(' ')[rarity[item.rarity][1]].split('/')[1]]:[item.varList?.variable.split(' ')[0].split('/')[0],item.varList?.variable.split(' ')[7].split('/')[0]]
  const [purchase, setPurchase] = useState(false);
  const [share, setShare] = useState(false);
  const [src,setSrc] = useState('');
  const itemDeets = [item.en1,item.en2,item.en3,item.en4,item.en5].map((elem, index) => {
    return { label: (item?.varList?.desc === "") ? elem : item?.varList?.desc.split('/')[index] }
  });
  
  useEffect(() => {
    setFav(updatedFavList || fav[0]?.fav);
  }, [updatedFavList,user,Fav,share,purchase])
  const opts ={
    color:{
        dark:"#DAA520",
        light:"#2D3033"
    }
}
const generate = () => {
  QRCode.toDataURL(window.location.origin+`/pedestal/${item.itemName}?offerID=${item.offerID}`,opts).then(setSrc);
}
const QRBUTTON= <Box sx={{zIndex:-1}}>
<img src={src} />
{/* <Button onClick={generate}>generate</Button> */}</Box>

  function updateFav() {
    setIsFav(prevState => {
      const newState = !prevState;
      return newState;
    });
    updateFavDB(!isFav)
  }

  function updatePur() {
    if (share) {setShare(false);return};
    setPurchase(prevState => {
      const newState = !prevState;
      return newState;
    });
  }
  function updateShare() {
    generate();
    if (purchase) {setPurchase(false);return};
    setShare(prevState => {
      const newState = !prevState;
      return newState;
    });
  }
  async function updateFavDB(FAV) {
      if (!Fav){alert('Error updating the data! Sorry about that...trying reloading first - Soulheart Sutler');return}
      let favArray = Fav != null? Fav.split('/').filter(id => id !== ''):null; // Split fav string into an array and remove empty values
      
    try {
      if (FAV) {
        if (!favArray.includes(item.offerID.toString())) {
          favArray.push(item.offerID.toString()); // Add the offerID to the fav array if it doesn't already exist
        }
      } else {
        favArray = favArray.filter(id => id !== item.offerID.toString()); // Remove the offerID from the fav array
      }
      const temp = favArray.join('/'); // Convert the fav array back to a string
      const F = {
        id: user.id,
        fav: temp
      }
      let {error } = await supabase.from('profiles').upsert(F)
      if (error) {
        throw error;
      }else{setFav(temp);onUpdateFav(temp);}
    } catch (error) {
      alert('Error updating the data! Sorry about that...trying reloading first - Soulheart Sutler');
      console.log(error);
    }
  }
  
  
  function bannerT(item){
    switch(item){
       case 'Jewelry':  
        return 'BONUS';
      case 'Ammunition': case 'Consumable':case 'Material':case 'Collectibles':case 'Utility':
        return 'QUANTITY';
      default:
        return 'RATING';
    }
  }
  const bannerTyp = bannerT(item?.varList?.cat)
  let temp;
  switch (item?.varList?.cat? item.varList.cat:item.cat) {
    case 'Utility':
      temp = '-'
      break;
    case 'Jewelry':
      temp = item.varList.variable.split(' ')[rarity[item?.rarity][1]].split('/')[0]
      break;
    default:
      temp = item.rating;
      break;
    }
  const ratingTyp = temp;
  const commentTyp = item?.varList?.variable?.split(' ')[rarity[item?.rarity][1]].split('/')[0]
  const cardStyles={
    minWidth: 275, 
    maxHeight: 275, 
    display: 'flex', 
    border: borderColor, 
    position: "relative", 
    backgroundColor: "#2D3033", 
    borderRadius: 7,
    borderBottom:`5px solid ${rarityTheme}`,
    paddingBottom:'0px'
  }
  function karmaDistill(str){
    let temp = str.split('//');
    const pos = temp[0]==''? 0:temp[0]
    const neg = temp[1]==''? 0:temp[1]
    return pos-neg;
  }
  function karmaColor(K){
    let result =''
    if (K == 0){result = 'white'; return result};
    if (K < 0){result = '#DE3163'};
    if (K <= -3){result = '#D2042D'};
    if (K > 0){result = '#00FFFF'};
    if (K >= 3){result = '#0096FF'};
    if (K >= 10){result = '#1F51FF'};

    return result
  }
  
  function custText(str,i){
    let t1= str.substring(0,str.search('{'))
    let t2= str.substring(str.search('}')+1)
    return <Stack direction="row">
              {t1} 
              <Typography sx={{color: rarityTheme,fontSize: 18, }}>{i}</Typography>
               {t2}
            </Stack>
  }
  
  const favoriteButton = isFav?
  <Tooltip title="Unfavorite" arrow placement="top">
    <Button sx={{zIndex:99, flex: 1, objectFit: 'contain', maxWidth: 55, maxHeight:55,position: 'absolute', top: 0, left: 0, display: (item.offerID=='null'?'none':'default') }}>
      <CardMedia
      component="img"
      image={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/imagelist/Soul_Heart.png`}
      alt='Favorite Item'
      onClick={() => {
        updateFav();
      }}
      />
    </Button>
    </Tooltip>:
    <Tooltip title="Favorite" arrow placement="top">
    <Button sx={{ zIndex:99,flex: 1, objectFit: 'contain', width: 10, maxHeight:30,position: 'absolute', top: 10, left: -6, display: (item.offerID=='null'?'none':'default') }}
      onClick={() => {
        updateFav();
      }}>
      <BookmarkAddOutlined color= 'action' fontSize="large" />
    </Button>
  </Tooltip>
  return (
    <Card sx={{ ...cardStyles }}>
        <Box sx={{
        position: "absolute",
        top: -26,
        left: -6,
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "40px 40px 40px 0",
        transform: "rotate(45deg)",
        borderColor: rarityTheme,
        zIndex: 0,
      }}> </Box>
      
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', zIndex: 2, pl: 3, ml: -2,color: "rgb(215, 215, 215)" }}>

        {item.profiles.id != user?.id && user!= null&&share==false? favoriteButton:''}
        {!share?<CardMedia
          component="img"
          sx={{ flex: 1, objectFit: 'contain', minWidth: 75, maxWidth: 100 }}
          image={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/imagelist/${item.itemName.replace(/ /g, '_')}.png`}
          alt={item.itemName.replace(/ /g, ' ')}
        />:<Box sx={{pt:4}}>
        {QRBUTTON}
        </Box>}
      

        <Box sx ={{ flexDirection: 'column'}}>
          <ThemeProvider theme={theme}>
          <Box sx={{width:'100%', textAlign:'center'}}>
              <Typography variant="h5" textTransform='capitalize'>{item.itemName.replace('Rubysilver', 'RubyS')}</Typography>
          </Box>
          </ThemeProvider>
          <Box sx ={{display: 'flex',flexDirection: 'row',mt:1,textAlign: 'center'}}>
            <ThemeProvider theme={theme}>
            <Box sx ={{flexDirection: 'column',border: borderColor}}>
              <Box sx ={{width:'100%', height:20, mb:0, pb:0}}>
              <Typography sx={{ fontSize: (bannerTyp== 'QUANTITY'?12:15),fontWeight: 'bold',borderBottom: borderColor,backgroundColor: rarityTheme,color:'black'}}>{bannerTyp}</Typography>
              </Box>
              <Box sx ={{width:'100%',borderBottom: borderColor, mt:0, pt:0}}>
              <Typography variant="h4" component="div" sx={{mt:1,fontWeight: 'bold'}}>{ratingTyp}</Typography>
              </Box>
              {item?.varList?.cat == 'Material'|| item?.varList?.cat == 'Ammunition' || item?.varList?.cat == 'Consumable'|| item?.varList?.cat == 'Collectibles'?<Tooltip title={item.varList.cat == 'Collectibles'?'Base Value':"Stack Maximum"} arrow placement="bottom">
              <Box sx ={{width:'100%', height:20,display:'flex',flexDirection: 'row',borderTop: 0,justifyContent:'center'}}>
              <Typography sx={{ fontSize: 16}}>{item.varList.cat == 'Collectibles'?'Value:':'Stack:'} {varList[1]}</Typography>
              </Box>
              </Tooltip>:<Tooltip title="Range" arrow placement="bottom">
              <Box sx ={{width:'100%', height:20,display:'flex',flexDirection: 'row',borderTop: 0}}>
              <Typography sx={{ fontSize: 16, width: '40%'  }}> {varList[0]}</Typography>
              <Typography sx={{ fontSize: 16, width: '22%'  }}>{' ~ '}</Typography>
              <Typography sx={{ fontSize: 16, width: '38%'  }}>{varList[1]}</Typography>
              </Box>
              </Tooltip>}
            </Box>
            </ThemeProvider>
            <Box sx={{ml:1}}>
            <Box sx={{
                position: "absolute",
                top: 60,
                left: share? 305 : 200,
                width: 70,
                height: 70,
                zIndex: -1,
                opacity: '10%'
              }}>
                <CardMedia
                    component="img"
                    image={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/imagelist/cardLogo.png`}
                    alt='Card Logo'
                    />
              </Box>
            {itemDeets.map((boxProps, index) => (
              <Box key={index} sx={{...deetsBoxStyles, height: '20px' }}>
                <List sx={{ display: 'flex', alignItems: 'center'}}>
                  {(boxProps.label != null && boxProps.label.search('{X}') >=0)? custText(boxProps.label,commentTyp) : boxProps.label}
                </List>
              </Box>
            ))}

            </Box>         
          </Box>
          __________________________
          <Box sx={{display:'flex',flexDirection:'column'}}>
            <Box sx={{display:'flex'}}>
            <Typography fontFamily='Montserrat' variant="h5" component="div" sx={{ width: '50%', color: "rgb(255, 215, 0)", textAlign: 'center', mt: .5 }}>
                {item.price}
              </Typography>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {Fav != '000/'&& Fav != null?<CardActions >
                {item.profiles.id != user.id ? <Tooltip title="Purchase" arrow placement="top">
                <Link onClick={() => updatePur()} underline="none" >
                <ShoppingCartRounded/>
                </Link>
                </Tooltip>:''}
                <Tooltip title="Similar" arrow placement="top">
                <Link href={`/pedestal/${item.itemName}?offerID=${item.offerID}`} underline="none" target="_blank">
                <StoreRounded />
                </Link>
                </Tooltip>
                <Tooltip title="Share" arrow placement="top">
                <Link onClick={() => updateShare()} underline="none" >
                <ShareRounded />
                </Link>
                </Tooltip></CardActions>
            : <CardActions ><Tooltip title="Similar" arrow placement="top">
            <Link href={`/pedestal/${item.itemName}?offerID=${item.offerID}`} underline="none" target="_blank">
            <StoreRounded />
            </Link>
            </Tooltip><Tooltip title="Share" arrow placement="top">
            <Link onClick={() => updateShare()} underline="none" >
            <ShareRounded />
            </Link>
            </Tooltip></CardActions>}
              
            </Box>
            
              
              {purchase||share?<TextField
          id="outlined-read-only-input"
          label={<Typography sx={{ color:'white' }}>{purchase? 'Paste This In Discord DM' : 'Share This With Friends'}</Typography>}
          defaultValue= {purchase?`Hail ${item.profiles.username}! I'm looking for a(n) [${item.itemName}] that you are selling for ${item.price}g, does [${item.soldBy}] still have it? -- Referred from PitchBlack -- [${item.itemName}] ${item.en1 ? item.en1:'No Bonuses'}${item.en2 ? '/' +item.en2:''}${item.en3 ? '/' +item.en3:''}${item.en4 ? '/' +item.en4:''}${item.en5 ? '/' +item.en5:''}`:`[${item.itemName}] ${item.en1 ? item.en1:''}${item.en2 ? '/' +item.en2:''}${item.en3 ? '/' +item.en3:''}${item.en4 ? '/' +item.en4:''}${item.en5 ? '/' +item.en5:''} -- www.pitchblack.market/pedestal/${item.itemName}?offerID=${item.offerID}`}
          //variant="filled"
          InputProps={{
            readOnly: true
          }}
          sx={{width: '25ch',backgroundColor:'grey.700'}}
        />:<Link target={item.profiles.id!=user?.id?'_blank':'_self'} href={item.profiles.id!=user?.id ? `/merchant?ID=${item.profiles.id}`:'/#'} color="inherit" underline="hover"><ThemeProvider theme={theme}>
        <Typography variant="h5" sx={{ textAlign: 'center', color: karmaColor(karmaDistill(item.profiles.karma)) }}><MemberBar karma={karmaDistill(item.profiles.karma)} user={item.profiles.username} status={item.profiles.status} avatar={item.profiles.avatar_url}/></Typography></ThemeProvider></Link>}
          </Box>
        </Box>
        
      </CardContent>
      
    </Card>
  );
})

export default BasicCard;