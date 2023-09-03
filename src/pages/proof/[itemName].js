import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import supabase from '@/utils/supabaseClient';
import Box from '@mui/material/Box';

export default function ItemPage() {
  const router = useRouter();
  const { itemName } = router.query;
  console.log(itemName)
  const [item, setItem] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase
          .from('varList')
          .select('*')
          .eq('itemName', itemName);
        setItem(data[0]);
      } catch (error) {
        setFetchError(error.message);
      }
    };

    if (itemName) {
      fetchData();
    }
  }, [itemName]);

  if (fetchError) {
    return <div>Error loading item: {fetchError}</div>;
  }
  console.log(item)
  if (item === null) {
    return <div>Loading...</div>;
  }else {
    return (
      <Box>
      <h1>{item.itemName}</h1>
      <p>{item.classComp}</p>
      </Box>
    );
  }

  
}
