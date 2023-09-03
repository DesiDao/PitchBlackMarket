import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import supabase from '@/utils/supabaseClient';
import Box from '@mui/material/Box';
import { Typography, Button, Select, MenuItem, TextField } from '@mui/material';

const statusOrder = ['#BDBDBD', '#808080','#57B3C1','#00FF00'];
const rarityOrder = ['Poor','Common','Uncommon','Rare','Epic','Legendary','Unique'];
const trarOrder= ['Cracked','Flawed','Normal','Exquisite','Perfect','Royal']

export default function FilterBox(props) {
    const [sortType, setSortType] = useState('price');
    const [ascending, setAscending] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const temp = props?.load

    const handleSortChange = (event) => {
        setSortType(event.target.value);
    }
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }
    const filteredTemp = searchTerm != ''?temp.filter(item => item.en1.indexOf(searchTerm)>-1|| item.en2.indexOf(searchTerm)>-1|| item.en3.indexOf(searchTerm)>-1||
        item.en4.indexOf(searchTerm)>-1|| item.en5.indexOf(searchTerm)>-1 ):temp;
    
    const sortedTemp = filteredTemp.sort((a, b) => {
      if (sortType != 'rarity'){
        if (ascending) {
            return parseInt(a[sortType]) - parseInt(b[sortType]);
        } else {
            return parseInt(b[sortType]) - parseInt(a[sortType]);
        }
      }else{
        console.log('Arranging by rarity')
        if (ascending) {
            return rarityOrder.indexOf(a[sortType]) - rarityOrder.indexOf(b[sortType]);
        } else {
            return rarityOrder.indexOf(b[sortType]) - rarityOrder.indexOf(a[sortType]);
        }
      }
    });

    console.log('sortedTemp', sortedTemp);
    console.log(rarityOrder.indexOf('Common'))
    return (
        <Box sx={{minHeight:'100px', backgroundColor:'grey.700'}}>
            <TextField label="Search" value={searchTerm} onChange={handleSearchChange} />
            <Select value={sortType} onChange={handleSortChange}>
                <MenuItem value='price'>Price</MenuItem>
                <MenuItem value='rating'>Rating</MenuItem>
                <MenuItem value='rarity'>Rarity</MenuItem>
            </Select>
            <Button onClick={() => setAscending(!ascending)}>Toggle Ascending/Descending</Button>
            {/* You can display the sortedTemp here */}
        </Box>
    );
}
