import React, { useEffect, useState } from 'react';
import supabase from '@/utils/supabaseClient';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Button, Card, CardContent, CardMedia, CardActions, List, Typography, Box, Link, Stack, Tooltip } from '@mui/material';
import { ShoppingCartRounded, StarOutlined, ConnectWithoutContactRounded, BookmarkBorderRounded, StoreRounded, ShareRounded, BookmarkAddOutlined } from '@mui/icons-material';
import MemberBar from './MemberBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import BasicCard from './sell_order';

export default function OrderList(props) { //(user,itemName||'Main'||'Account',) ACCOUNT&&NOuser=>send to login
  const { USER, PAGE } = props;
    const supabase = useSupabaseClient();
    const isUser = USER != null && USER != undefined;//needs to be nulled if not a registered person
    const user = isUser? USER: '0';
    const [Fav, setFav] = useState(null);
    const [displayCount, setDisplayCount] = useState(30);
    const [sell_offers, setSellOffers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updatedFavList, setUpdatedFavList] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('created_at');
    const [sortOrder, setSortOrder] = useState('desc');

    async function getUser() {//HAPPENS REGARDLESS
      try {
        setLoading(true)
        let { data:fav, error} = await supabase
          .from('profiles')
          .select(`fav`)
          .eq('id', user.id)
  
        if (error) {
          throw error
        }
  
        if (fav) {
          setFav(fav)
        }
      } catch (error) {
      } finally {
        setLoading(false)
        
      }
    }
    function handleSearchAndSort(items) {
      return items
        .filter(item => 
          item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          const valueA = sortOrder === 'asc' ? a[sortType] : b[sortType];
          const valueB = sortOrder === 'asc' ? b[sortType] : a[sortType];
          if (valueA < valueB) return -1;
          if (valueA > valueB) return 1;
          return 0;
        });
    }
    async function fetchMain(){
      try {
        setLoading(true)
        
        let { data: sell_offers, error } = await supabase
      .from('sell_offers')
      .select('offerID,itemName,rarity,price,rating,profiles(username,status,karma,id,avatar_url),en1,en2,en3,en4,en5,soldBy')
      .eq('available', true)
      .order('created_at', { ascending: false })
      .limit(30);
        
  
        if (sell_offers && sell_offers.length > 0) {
          const itemNames = sell_offers.map(offer => offer.itemName);
          const { data: varList, error } = await supabase
            .from('varList')
            .select('*')
            .in('itemName', itemNames);
    
          if (varList) {
            const updatedOffers = sell_offers.map(sell_offer => {
              const varListItem = varList.find(v => v.itemName === sell_offer.itemName);
              return { ...sell_offer, varList: varListItem };
            });
            setSellOffers(updatedOffers);
            
          } else {
            setSellOffers(sell_offers);
          }
        } else {
          setSellOffers(null);
        }
        
      } catch (error) {
        alert('Error loading sales data!')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    
    function handleUpdateFav(newFav) {
      setFav(newFav);
      setUpdatedFavList(newFav); // Set the updated favorite list
    }
    
    useEffect(() => {
      if (isUser&&user!=null&&Fav=='0/'){getUser();}else if(!isUser&&Fav!='0/'){setFav('0/');}
      
      if(Fav==null||sell_offers==null) {fetchMain();}
    }, [user, Fav,sell_offers])
    const sellOffersList = sell_offers && handleSearchAndSort(sell_offers).map((item, index) => (
      <BasicCard 
        key={index}
        item={item}
        fav={Fav}
        onUpdateFav={handleUpdateFav}
        updatedFavList={updatedFavList}
      />
    ));
    const logo = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/-.png";
    const handleLoadMore = async () => {
      setLoading(true);
      try {
        // Fetch the next 30 sell orders based on displayCount
        let { data: additionalSellOffers, error } = await supabase
          .from('sell_offers')
          .select('offerID,itemName,rarity,price,rating,profiles(status,karma,id,avatar_url),en1,en2,en3,en4,en5,soldBy')
          .eq('available', true)
          .order('created_at', { ascending: false })
          .range(displayCount, displayCount + 30); // Fetch the next 30 orders
  
        if (additionalSellOffers && additionalSellOffers.length > 0) {
          // Append the new orders to the existing list
          setSellOffers((prevSellOffers) => [...prevSellOffers, ...additionalSellOffers]);
          setDisplayCount((prevDisplayCount) => prevDisplayCount + 30);
        }
      } catch (error) {
        alert('Error loading additional sales data!');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    return (
          <Box sx={{display:'flex',flexDirection:"column",flexWrap:'wrap', width:'100%'}}>
            {/* Render the list of items using the variable */}
            <Box sx={{display:'flex',flexDirection:"row",flexWrap:'wrap',gap:'5px',p:1, minHeight: PAGE=='Main'?'900px':'500px','@media (max-width: 767px)': {p:0}}}>
            {sellOffersList || 'Loading...'}
            </Box>
            {/* Load More button */}
            {sellOffersList ?<Button onClick={handleLoadMore} variant="contained" color="primary" disabled={loading}>
              Load More
            </Button>:''}
          </Box>
    );
  }