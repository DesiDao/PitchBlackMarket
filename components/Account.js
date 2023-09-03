import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import {Box,FormControl, Button, Stack, Typography, ButtonGroup,List, ListItem, ListItemAvatar} from '@mui/material';
import {ListItemIcon, ListItemText, Avatar, IconButton, FormGroup, Checkbox, Grid} from '@mui/material';
import {styled}  from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Nav from './Nav';
import ClarkConvo from './ClarkConvo'
import MemberBar from './MemberBar';
import BasicCard from './sell_order';
import RegParty from './RegParty';
import FAVList from './Account_FavList';
import Footer from './Footer';
import Backdrop from '@mui/material';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function Account({ session,id,meta }) {
  const ID = id
  const META = meta
  //console.log(META) //id ID is null and regAdv =='' then I need to push the Alert Fab
  const supabase = useSupabaseClient();
  const user = useUser();
  const isMobile = useMediaQuery('(max-width:767px)');
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [Karma, setKarma] = useState(null);
  const [kString, setKString] = useState(null);
  const [status, setStatus] = useState(null);
  const [sell_offers,setOffers]=useState(null);
  const [Fav,setFav]=useState(null);
  const [favList, setFavList]=useState(null);
  const [regAdv,setReg]=useState(null);
  const [Del,setDel]=useState(false);
  const [Ava, setAva]=useState(null);
  const [updatedFavList, setUpdatedFavList] = useState(null);
  const [curButt,setCurButt]=useState(false);
  const [reqButt,setReqButt]=useState(false);
  const [favButt,setFavButt]=useState(true);
  const [emptyReg,setEmptyReg]=useState(false);
  const [voteKarma,setVote]=useState(null);
  const danceSkelly = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/dancing_skelly.jpg"
  const bookEND = <img
  src={process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/dancing_skelly.jpg"}
  alt="Bookend"
  sx={{ filter: 'invert(1)',height: '200px'}}
  />

  useEffect(() => {
    if (regAdv == null&& ID != null) {getProfile();}
    if (sell_offers == null&& ID != null&&ID != undefined) {getOrders();}
    if (sell_offers != null&&regAdv != null&&favList==null&& ID == 'self'){getFav();}
  }, [session,Fav, sell_offers,regAdv, favList,ID])
  function karmaColor(K){
    let emo;
    if (K > 0) emo = <SentimentSatisfiedIcon fontSize='large'/>;
    if (K >= 10) emo = <SentimentVerySatisfiedIcon fontSize='large'/>;
    if (K === 0) emo = <SentimentNeutralIcon fontSize='large'/>;
    if (K < 0) emo = <SentimentDissatisfiedIcon fontSize='large'/>;
    if (K <= -3) emo = <MoodBadIcon fontSize='large'/>;

    
    let color;
    if (K > 0) color = '#00FFFF';
    if (K >= 10) color = '#1F51FF';
    if (K === 0) color = 'white';
    if (K < 0) color = '#DE3163';
    if (K <= -3) color = '#D2042D';
    return [emo,color];
}

const karmaEmo = karmaColor(Karma)[0];
function karmaDistill(str){
  //console.log('OG:',str)
  let temp = str.split('//');
  //console.log('Pos:',temp[0])
  //console.log('Neg:',temp[1])
  const pos = temp[0]==''? 0:temp[0].split('/').length
  const neg = temp[1]==''? 0:temp[1].split('/').length
  return pos-neg;
}
  function handlePageButt(str){
    if(str=='Req') return;
    setCurButt(false);
    setReqButt(false);
    setFavButt(false);
    eval(`set${str}Butt(true)`)
  }

  const buttons = !ID ? [
    <Button key="Cur" onClick={() => handlePageButt("Cur")} variant={curButt?"contained":"outlined"}><Typography variant={curButt?'h5':'h6'} >Current</Typography></Button>,
    <Button key="Req" onClick={() => handlePageButt("Req")} variant={reqButt?"contained":"outlined"}><Typography variant={reqButt?'h5':'h6'}>Soon</Typography></Button>,
    <Button key="Fav" onClick={() => handlePageButt("Fav")} variant={favButt?"contained":"outlined"}><Typography variant={favButt?'h5':'h6'}>Favorited</Typography></Button>,
  ]:[
    <Button key="Cur" onClick={() => handlePageButt("Cur")} variant={curButt?"contained":"outlined"}><Typography variant={curButt?'h5':'h6'} >Current</Typography></Button>,
    <Button key="Req" onClick={() => handlePageButt("Req")} variant={reqButt?"contained":"outlined"}><Typography variant={reqButt?'h5':'h6'}>Soon</Typography></Button>,
  ];
  const bgBox ={
    display: 'flex',
    flexDirection: 'column',
    height:'100vh',
    border: '1px solid white',
    backgroundColor:'black'
  };
  function handleUpdateFav(newFav) {
    setFav(newFav);
    setUpdatedFavList(newFav); // Set the updated favorite list
  }
  async function getProfile() {
    if (ID == null||ID==undefined||id == null||id==undefined){console.log('too early');return;}
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`karma, status,regAdv, fav,username,avatar_url`)
        .eq('id', ID&&ID!=undefined&&ID!='self'?ID:user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        
        /* if (ID!='self'){
          console.log('Searching neighbor account data')
          console.log(data)
        }else {
          console.log('Comparing database meta values...')
          console.log('emails are the same: ',META.email==user.email?true:false)
          console.log('avatars are the same: ',META.avatar==data.avatar_url?true:false)
        } */
        setKarma(karmaDistill(data.karma))
        setKString(data.karma);
        setVote(evalVote(data.karma));
        setStatus(data.status)
        setReg(data.regAdv)
        setFav(data.fav.split('/'))
        setAva(data.avatar_url)
        setUsername(data.username)
        //console.log('user',user)
        //console.log('usernames are the same: ',META.username==data.username?true:false)
          if (META !=null){
            if (META.username!=data.username&&ID=='self'){
              updateName(META.username);setUsername(META.username);
            };
            if (META.avatar!=data.avatar_url&&ID=='self'){
              updateAva(META.avatar);setAva(META.avatar);
            };
          };
        if(data.regAdv == ''){setEmptyReg(true)}
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function getOrders(){
    karmaDistill('//');
    try {
      setLoading(true)
      
        let { data: offers, error } = await supabase
        .from('sell_offers')
        .select('offerID,itemName,rarity,price,rating,varList(variable,desc,cat),profiles(status,karma,id,avatar_url,username),en1,en2,en3,en4,en5,soldBy')
        .eq('available',true)
        .eq('id',ID&&ID!=undefined&&ID!='self'?ID:user.id)

      if (error) {
        throw error
      }

      if (offers) {
        setOffers(offers)
      }
    } catch (error) {
      alert('Error loading sell offers!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function getFav() {
    try {
      setLoading(true);
      const favPromises = Fav.slice(1).map(async (favOfferID) => {
        const { data: FAV, error } = await supabase
          .from('sell_offers')
          .select('*,id(username,id)')
          .eq('available', true)
          .eq('offerID', favOfferID);
  
        if (error) {
          throw error;
        }
  
        return FAV[0];  // Assuming the data contains only one item
      });
  
      const favData = await Promise.all(favPromises);
      const filteredFavData = favData.filter(item => item !== undefined);
      if (filteredFavData.length != Fav.slice(1).length) {
        let filtered = '000/'
        filteredFavData.forEach(item => {filtered += item.offerID + '/';});
      
        const updates = {
          id: user.id,
          fav: filtered
        }
        let { errorr } = await supabase.from('profiles').upsert(updates)
        if (errorr) throw errorr
        
        setFavList(filteredFavData);
      } else {
        setFavList(filteredFavData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  

  async function setStatusOnline(stat) {
    try {
        setLoading(true)
  
        const updates = {
          id: user.id,
          status: stat
        }
  
        let { error } = await supabase.from('profiles').upsert(updates)
        if (error) throw error
        //alert('Signed in successfully!')
      } catch (error) {
        //alert('Error signing you in!')
        console.log(error)
      } finally {
        setLoading(false)
        if (stat === '#BDBDBD') {supabase.auth.signOut();}
        else{location.reload();}
      }
  }
  async function updateAva(str) {
    console.log('Updating supabase avatar...')
    try {
        const updates = {
          id: user.id,
          avatar_url: str
        }
  
        let { error } = await supabase.from('profiles').upsert(updates)
        if (error) throw error
        //alert('Signed in successfully!')
      } catch (error) {
        //alert('Error signing you in!')
        console.log('Avatar update failed! *womp womp*')
        console.log(error)
      } finally {
        console.log('Supabase avatar updated!')
      }
  }
  async function updateAdv(str) {
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
        console.log('Success')
      }
  }
  async function updateName(str) {
    console.log('Updating supabase username...')
    try {
        const updates = {
          id: user.id,
          username: str
        }
  
        let { error } = await supabase.from('profiles').upsert(updates)
        if (error) throw error
        //alert('Signed in successfully!')
      } catch (error) {
        //alert('Error signing you in!')
        console.log(error)
      } finally {
        //location.reload();
        console.log('Username updated successfully')
      }
      
  }
  async function updateOffer(item) {
    let temp = regAdv.split('/').filter(elem => elem.indexOf(item.soldBy) > -1).toString().split(',')
    let  iTotal=parseInt(temp[2])-1
      let OG = temp.toString()
      temp[2]= iTotal.toString()
      let res = regAdv.replace(OG,temp.toString())
      console.log(res) 
    try {
      setLoading(true)
      
      let { error } = await supabase.from('sell_offers').update({ available: false }).eq('offerID', item.offerID).eq('id', item.profiles.id)
      if (error) throw error
      alert('Item removed from your warehouse!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      updateAdv(res)
      setLoading(false)
      
    }
    
  }
  const skelly = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/Clerk_Kalsium.jpg";
  const coin=[
    {req:0,alt:"Clay",url: "clay_badge.png"},
    {req:1,alt:"Iron",url: "iron_badge.png"},
    {req:10,alt:"Bronze",url: "bronze_badge.png"},
    {req:50,alt:"Silver",url: "silver_badge.png"},
    {req:250,alt:"Gold",url: "gold_badge.png"},
    {req:1000,alt:"Black Gold",url: "black_gold.png"}
  ];
  
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
  function deleteItem(item) {
    updateOffer(item);
  }
  function delMode(){
    setDel(prevState => {
      const newState = !prevState;
      return newState;
    });
  }
  async function updateKarma(str) {
    try {
      setLoading(true)
      
      let { error } = await supabase.from('profiles').update({ karma: str }).eq('username', username)
      if (error) throw error
      
    } catch (error) {
      
      console.log(error)
    } finally {
      setLoading(false)
      
    }
    
  }
  async function evalVote(str){
    if (str.indexOf(user.id) >-1){
      let temp = str.split('//');
      if (temp[0].indexOf(user.id) >-1){return'pos'}
      if (temp[1].indexOf(user.id) >-1){return'neg'}
    }else{return null;}
  }
  async function handleVote(str){
    let TEMP = kString.split('//');
      let res0
      let res1
    //console.log('Updating karma...')
    if (kString.indexOf(user.id) >-1){
      if (TEMP[0].indexOf(user.id) > -1){
        //console.log('You voted positive...')
        if (str == 'pos'){return;}
        else{
          setVote(str);
          //remove from left and add to right
          res0 = TEMP[0].replace(','+user.id,'')
          //console.log(res0)
          res1= user.id+TEMP[1]+',';
          //console.log(res1)
        }
      };
      if (TEMP[1].indexOf(user.id) > -1){
        //console.log('You voted negative...')
        if (str == 'neg'){return;}
        else{
          setVote(str)
          //remove from right and add to left
          res0 = ','+user.id+TEMP[0];
          //console.log(res0)
          res1=TEMP[1].replace(user.id+',','')
          //console.log(res1)
        }
      };

    }else{
      //console.log('Voting on new account!');
      if (str == 'pos'){
        setVote(str);
          res0 = ','+user.id+(TEMP[0]!=null&&TEMP[0]!=undefined)? TEMP[0]:''
          //console.log(res0)
          res1= (TEMP[1]!=null&&TEMP[1]!=undefined)?TEMP[1]:'';
          //console.log(res1)
      }else if(str == 'neg'){
        setVote(str);
        res0 = (TEMP[0]!=null&&TEMP[0]!=undefined)?TEMP[0]:'';
        //console.log(res0)
        res1= ((TEMP[1]!=null&&TEMP[1]!=undefined)? TEMP[1]:'')+user.id+','
        //console.log(res1)
      };
    };
      
      
    //console.log('Setting:',res0+'//'+res1)
      setKString(res0+'//'+res1);
      setKarma(karmaDistill(res0+'//'+res1));
      updateKarma(res0+'//'+res1)
  }
  const sellOffersList = Del? sell_offers && sell_offers.map((item, index) => (
    <Box
      sx={{
        '&:hover': {
          backgroundColor: 'grey.300',
          zIndex:10 // change background color on hover
        },
      }}
      onClick={() => deleteItem(item)}
    >
      <BasicCard 
        key={index}
        item={item}
        fav={'000/'}
        onUpdateFav={handleUpdateFav}
        updatedFavList={updatedFavList}
      />
    </Box>
  )):sell_offers && sell_offers.map((item, index) => (
    <Box    >
      <BasicCard 
        key={index}
        item={item}
        fav={'000/'}
        onUpdateFav={handleUpdateFav}
        updatedFavList={updatedFavList}
      />
    </Box>
  ));
    function Thumbs(str){
      if (str == 'pos'){
        return
      }else{
        return
      }
    }
  return (
  <Box  sx={{width:'100%','@media (max-width: 767px)': {width: '100vh'}}}>
    <Nav />
    <Box display='flex' sx={{flexDirection:'row','@media (max-width: 767px)': {flexDirection:'column'}}}>
    <Box display='flex' sx={{p:1}}><img src={danceSkelly} style={{maxHeight: 400, width: 'auto',transform: 'scaleX(-1)',filter: 'invert(1)'}} /><img src={skelly} style={{maxHeight: 400, width: 'auto'}} /></Box>
    <Box sx={{p:1,width:'100%'}}  height={400} display='flex' flexWrap='wrap'>
      {/*       <Box>
        <label htmlFor="karma">Merchant Score</label>
        <input
          id="karma"
          type="text"
          disabled
          value={Karma}
          //value={getCoinValue(Karma).alt +" Rank" || ''}
        />

      </Box> */}
      {sell_offers&&Fav&&regAdv!==null?<ClarkConvo karma={Karma} name={username} id={ID} empty={(regAdv=="")}/>:''}
      <Box width='100%' height={20} sx={{bottom:0}}>
        <Typography variant='h5' color='white'> - Clerk Calseum</Typography>
      </Box>
      <Box display='flex' sx={{border:'1px solid white', minWidth:'600px'}}>
      
      <FormControl>
      <Box display='flex' flexDirection='row'>
        <Box sx={{pl:1, pt:2,pr:1, height:'100px'}} ><img src={Ava} /></Box>
        <Box display='flex' flexDirection='column'>
          <Typography variant='h5' color='white'> {username}</Typography>
          <Box display='flex' flexDirection='row'>
            {ID!='self'?<Button><ThumbDownOffAltIcon fontSize='large' onClick={() => handleVote('neg')}/></Button>:<Typography variant='h6' color='white'> Karma&nbsp;&nbsp;</Typography>}
            {karmaEmo}
            {ID!='self'?<Button><ThumbUpOffAltIcon fontSize='large' onClick={() => handleVote('pos')}/></Button>:null}
            <Typography variant='h5' color={karmaColor(Karma)[1]} sx={{pl:1}}> {Karma >=0?'+ ':''}{Karma}</Typography>
          </Box>
        </Box>
        
      </Box>
      


      <Box>
      </Box>
    </FormControl>
    {ID =='self'?
    <Box display='flex' sx={{position:'relative', top:'45%'}}>
    <Stack direction='row' >
        {/* <Box sx={{pt:1.5}}> <Typography variant='h4'><MemberBar karma={Karma || ''} user={username || ''} status={status|| ''} avatar={META.avatar||''}/></Typography></Box> */}
        <Stack >
        <Box  textAlign='center' border='1px solid white'><Typography>STATUS</Typography></Box>
      <Stack  direction='row'border='1px solid white'>
      <Box>
        <Button className="Button block" onClick={() => setStatusOnline('#00FF00')}>
          Active
        </Button>
      </Box>
      <Box>
        <Button className="Button block" onClick={() => setStatusOnline('#57B3C1')}>
          DM ONLY
        </Button>
      </Box>
      <Box>
        <Button className="Button block" onClick={() => setStatusOnline('#808080')}>
          Invisible
        </Button>
      </Box>
      <Box>
        <Button className="Button block" onClick={() => setStatusOnline('#BDBDBD')}>
          Sign Out
        </Button>
      </Box>
      </Stack>
        </Stack>
      </Stack>
      </Box>:''
      }
      </Box>
    </Box>
    {!isMobile?<Box display='flex' sx={{p:1}}><img src={danceSkelly} style={{maxHeight: 400, width: 'auto',filter: 'invert(1)', right:0 }} /></Box>:null}
    </Box>
    <Box display='flex' sx={{flexDirection:'row','@media (max-width: 767px)': {flexDirection:'column'}}}>
    
    <RegParty STR={regAdv?regAdv:''} SELF={(ID!='self')}/>
    <Box sx={{pl:2}} display='flex' flexDirection='column'>
    
    {ID=='self'?<Box>
    <Box display='flex' flexDirection='row' sx={{alignItems: "center", justifyContent: "center"}}>
    <Typography variant="h4" component="div">Favorites</Typography>

    </Box>
    <FAVList fav={favList} favRef={Fav} USER={user} CLIENT={supabase}/></Box>:
    <Box>
    <Box display='flex' flexDirection='row' sx={{alignItems: "center", justifyContent: "center"}}>
    <Typography variant="h4" component="div">Current Wares</Typography>

    </Box>
    <FAVList fav={sell_offers} favRef={'other'} USER={user} CLIENT={supabase}/></Box>}
      </Box>
    </Box>
    {ID=='self'?<Box>
    <Box textAlign='center' border='3px solid white' display='flex' flexDirection='row'sx={{alignItems: "center", justifyContent: "center"}}><Typography variant='h4' color='white'> {Del?"Click each offer to remove them from your sale list":"Current Wares"}</Typography><Button variant="contained" color="error" onClick={() => delMode()}>{Del?"Cancel":"Delete"}</Button>
    </Box>
    <Box sx={{display:'flex',flexDirection:"row",flexWrap:'wrap',gap:'5px',p:1}}>
          {/* Render the list of items using the variable */}
          {sellOffersList || 'Loading...'}
          
        </Box></Box>:''}
        <Footer />
  </Box>
  
  )
}