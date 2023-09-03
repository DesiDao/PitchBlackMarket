import supabase from '@/utils/supabaseClient';
import React,{ useEffect, useState } from 'react';
import SkullBox from "components/SkullBox";
import {Box,Stack,Typography, Button, Select, MenuItem,TextField, InputLabel,FormControl} from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import RangeTable from "components/RangeTable";
import ClassComp from "components/ClassComp";
import DeetsTable from "components/DeetsTable";
import ModBox from 'components/ModBox';
import { useRouter } from 'next/router';
import BasicCard from '/components/sell_order';
import Nav from 'components/Nav';
import SlotDisplay from 'components/SlotDisplay';
import Footer from 'components/Footer';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import FilterBox from 'components/FilterBox';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { amber } from '@mui/material/colors';
import { useMediaQuery } from 'react-responsive'

export default function MyPage(){
const supabase = useSupabaseClient();
const user = useUser();
const [fetchError, setFetchError] = useState(null);
const [loading, setLoading] = useState(true);
const [sell_offers, setSellOffers] = useState(null);
const router = useRouter();
const { itemName,offerID } = router.query;
const [Item, setItem] = useState(null);
const [slotClickStatus, setSlotClickStatus] = useState(false);
const [shopClickStatus, setShopClickStatus] = useState(false);
const [Fav, setFav] = useState(null);
const [updatedFavList, setUpdatedFavList] = useState(null);
const [EN,setEN]=useState(null);
const [Foci, setFoci] = useState(null);
const [displayCount, setDisplayCount] = useState(25);
const statusOrder = ['#BDBDBD', '#808080','#57B3C1','#00FF00'];
const rarityOrder = ['Poor','Common','Uncommon','Rare','Cobalt','Epic','Rubysilver','Legendary','Unique','Named'];
const trarOrder= ['Cracked','Flawed','Normal','Exquisite','Perfect','Royal']
const [searchTerm, setSearchTerm] = useState('');
const [filterRarity, setFilterRarity] = useState(''); //filter out Rarity, if empty accept all
const [sortEn, setSortEn] = useState('');//those with specified En show first, wll need to split mass into into groups of haves and have not and apply sortType sorting on each individually, then concatenate
const [sortType, setSortType] = useState('rating');
const [ascending, setAscending] = useState(true);
const isMobile = useMediaQuery({ maxWidth: 767 })

const handleSortChange = (event) => {
  setSortType(event.target.value);
}
const handleShopClickStatusChange = (newStatus) => {
  setShopClickStatus(newStatus);
};
function handleUpdateFav(newFav) {
  setFav(newFav);
  setUpdatedFavList(newFav); // Set the updated favorite list
}
const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
}
const handleClearSelection = () => {
  console.log('clearing...')
  setSearchTerm('');
  console.log(searchTerm)
};
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      if (user != null){const {data:FAV} = await supabase
        .from('profiles')
        .select(`fav`)
        .eq('id', user.id)
      
        if (user != null){setFav(FAV);}
      
      }else{setFav('000/')}

      const { data: offers, error } = await supabase//place switch for data so it handles pages correctly
      .from('sell_offers')
      .select('offerID,itemName,rarity,price,rating,profiles(status,karma,id,avatar_url,username),en1,en2,en3,en4,en5,soldBy')
      .eq('available', true)
      .eq('itemName', itemName)
      .order('created_at', { ascending: false })
      .limit(25);

        const { data: varList, errorr } = await supabase
          .from('varList')
          .select('*')
          .eq('itemName', itemName);

        const { data: enList, errorrr } = await supabase
          .from('enchantList')
          .select('*');
          
        if (varList&&offers) {
          const updatedOffers = offers.map(offer => ({ ...offer, varList: varList[0]}));
          setSellOffers(updatedOffers);
          setEN(enList);
          setFoci(itemName);
        } else {
          setSellOffers(offers);
        }
        //console.log(varList[0]);
        setItem(varList[0]);
    } catch (error) {
      console.log(error);
      setFetchError(error.message);
    } finally {
      
      setLoading(false);
    }
  };

  if (Item == null || Fav == null) {
    fetchData();
  }
}, [Fav,Item]);
const filteredTemp = searchTerm != ''&&searchTerm != null&&searchTerm != undefined?sell_offers.filter(item => item.en1.indexOf(searchTerm)>-1|| item.en2.indexOf(searchTerm)>-1|| item.en3.indexOf(searchTerm)>-1||
        item.en4.indexOf(searchTerm)>-1|| item.en5.indexOf(searchTerm)>-1 ):sell_offers;
const sortedTemp = filteredTemp && filteredTemp.sort((a, b) => {
  if (sortType != 'rarity'){
    if (ascending) {
        return parseInt(a[sortType]) - parseInt(b[sortType]);
    } else {
        return parseInt(b[sortType]) - parseInt(a[sortType]);
    }
  }else{
    console.log('Arranging by rarity')
      if (ascending) {
          return  Item?.cat != 'Collectibles'?
          rarityOrder.indexOf(a[sortType]) - rarityOrder.indexOf(b[sortType]):
          trarOrder.indexOf(a[sortType]) - trarOrder.indexOf(b[sortType]);
      } else {
          return Item?.cat != 'Collectibles'?
          rarityOrder.indexOf(b[sortType]) - rarityOrder.indexOf(a[sortType]):
          trarOrder.indexOf(b[sortType]) - trarOrder.indexOf(a[sortType]);
      }
  }
});
  const sellOffersList = offerID ? sortedTemp && sortedTemp.filter(item => item.offerID.toString() != offerID).map((item, index) => (
    <BasicCard 
      key={index}
      item={item}
      fav={Fav? Fav:'000/'}
      onUpdateFav={handleUpdateFav}
      updatedFavList={updatedFavList}
    />
  )):sortedTemp && sortedTemp.map((item, index) => (
    <BasicCard 
      key={index}
      item={item}
      fav={Fav? Fav:'000/'}
      onUpdateFav={handleUpdateFav}
      updatedFavList={updatedFavList}
    />
  ));
  const focusOffer = offerID ? sortedTemp && sortedTemp.filter(item => item.offerID.toString() == offerID).map((item) => (
    <BasicCard
      item={item}
      fav={Fav? Fav:'000/'}
      onUpdateFav={handleUpdateFav}
      updatedFavList={updatedFavList}
    />
  )):'';
  const loadGIF = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/Loading_Skeleton.gif";
  const shopkeep = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/"+Item?.soldBy+".png";
  const emptyskelly =process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/skellyempty.gif";
  function Pedestal({ itemN }){
    const skelly = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/Undead%20traveling-merchant%20@%20300.png";

    return(
     <Box sx={{backgroundColor:'#272727', justifyContent:'center',display:'flex', flexDirection: 'column', width:'100%','@media (max-width: 767px)': {width:'100vh'}}}>
         <SkullBox name={itemN} />
         <Box sx={{
           height: 300,
           border: "2px ridge",
           borderColor: '#FFC90E',
           maxHeight: "100%",
           overflow: "hidden",
           display: "flex",
           flexDirection: "row",
           alignItems: "center",
           justifyContent: "center",
           position: "relative",
         }}>
             <Box sx={{height: '100%'}}>
             <img src={skelly} style={{maxHeight: 300, width: 'auto',position:'absolute',left:0,zIndex:0}} />
             </Box>
             {!isMobile?<DeetsTable item={Item} onShopClickStatusChange={handleShopClickStatusChange}/>:null}
             &nbsp;&nbsp;     
             <Box sx={{zIndex: 1}}>
             <RangeTable varr={Item}/>
             </Box>
             &nbsp;&nbsp;
             <Box sx={{textAlign:'center',zIndex:1,}}>
                {!isMobile? <ModBox props ={Item}/>:null} 
             </Box>
             &nbsp;&nbsp;
             <Box sx={{zIndex:1, backgroundColor: '#272727',}}>
                 <ClassComp STR={Item}/>
                 
             </Box>  
             &nbsp;&nbsp;     
             <Box sx={{height: '100%',zIndex:0}}>
             <img src={skelly} style={{
             maxHeight: 300,
             width: "auto",
             position: "absolute",
             right: 0,
             transform: "scaleX(-1)",
             overflow: "hidden",
             zIndex: -1,
           }} />
             </Box>
         </Box>
         <Box  sx={{display: "flex",justifyContent:'center'}}>
            <Box sx={{minHeight:'100px', backgroundColor:'grey.700',width:'400px',display: "flex",flexDirection:'row'}}>
            {Item?.cat != 'Collectibles'&&Item?.cat != 'Consumable'&&Item?.cat != 'Ammunition'?
            <FormControl fullWidth>
            
            <InputLabel id="demo-simple-select-label">Enhancement</InputLabel>
            <Select sx={{minWidth:'100px'}}value={searchTerm} onChange={handleSearchChange}>
            
                {EN.map((en, index) => (
                    <MenuItem key={index} value={en.name}>{en.name}</MenuItem>
                ))}
            </Select>
            <Button sx={{ color: amber[500] }} onClick={() => handleClearSelection()}>Clear Selection</Button>
            </FormControl>:null}
            <FormControl fullWidth>
                <Select value={sortType} onChange={handleSortChange}>
                    <MenuItem value='price'>Price</MenuItem>
                    <MenuItem value='rating'>{Item.cat!='Collectibles'&&Item.cat!='Consumable'&&Item.cat!='Ammunition'?'Rating':'Quantity'}</MenuItem>
                    {Item.cat!='Ammunition'?<MenuItem value='rarity'>Rarity</MenuItem>:null}
                </Select>
                
                {/* You can display the sortedTemp here */}
                </FormControl>
                
                <Button onClick={() => setAscending(!ascending)}><ImportExportIcon fontSize='large' sx={{ color: amber[500] }}/></Button>
            </Box>
          </Box>

         <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "5px",minHeight:'750px' }}>
            {/* Conditional rendering */}
            {focusOffer}
            {sellOffersList&&sellOffersList.length > 0?sellOffersList:null}
            {sellOffersList.length == 0&&focusOffer==''
              ? <Box sx={{ display: 'flex', flexDirection:'column',justifyContent: 'center', alignItems: 'center',width:'100%'}}>
                  <Typography variant='h3'>No offers at this time...be the first!</Typography>
                  <img src={emptyskelly}/>
                </Box>:null}
        </Box>
     </Box>
    );
 }
 const handleLoadMore = async () => {
  setLoading(true);
  try {
    // Fetch the next 30 sell orders based on displayCount
    let { data: additionalSellOffers, error } = await supabase
      .from('sell_offers')
      .select('offerID,itemName,rarity,price,rating,profiles(username,status,karma,id,avatar_url),en1,en2,en3,en4,en5,soldBy')
      .eq('available', true)
      .eq('itemName', itemName)
      .order('created_at', { ascending: false })
      .range(displayCount, displayCount + 25);

    if (additionalSellOffers && additionalSellOffers.length > 0) {
      // Append the new orders to the existing list
      setSellOffers((prevSellOffers) => [...prevSellOffers, ...additionalSellOffers]);
      setDisplayCount((prevDisplayCount) => prevDisplayCount + 25);
    }
  } catch (error) {
    alert('Error loading additional sales data!');
    console.log(error);
  } finally {
    setLoading(false);
  }
};
  return (
    <Box display='flex' flexDirection='column' sx={{backgroundColor:'grey',flexWrap:'wrap',width:'100%','@media (max-width: 767px)': {width:'100vh'},}}>
      
      {Item ? <Pedestal itemN={Item.itemName} /> : <Box sx={{minHeight:'800px'}} direction='column'  ><SkullBox name={'statcalc'} /><Typography>Loading...</Typography><img src={loadGIF} style={{
             width: "auto",
             position: "absolute",
             right: '40%',
             top:'45%',
             overflow: "hidden",
             zIndex: 2,
           }} /></Box>}
      {sellOffersList && sellOffersList.length > 25 ?
        <Button onClick={handleLoadMore} variant="contained" color="primary" disabled={loading}>
          Load More
        </Button>:''
        }
      <Footer />
    </Box>
  );
  
}
