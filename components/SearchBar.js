import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import supabase from '@/utils/supabaseClient';
import { InputBase, TextField, Autocomplete, FormControl, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { amber } from '@mui/material/colors';

export default function SearchBar() {
  const [result, setResult] = useState('');
  const [dict, setDict] = useState(null);
  const [isTextFieldSelected, setIsTextFieldSelected] = useState(false);

  const fetchData = async () => {
    try {
      const { data: varList, error } = await supabase.from('varList').select('itemName');

      if (varList) {
        setDict(varList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isTextFieldSelected) {
      fetchData();
    }
  }, [isTextFieldSelected]);
  const router = useRouter();
  

  return (
    <Box display="flex" flexDirection="row" sx={{  backgroundColor: 'grey.500', width: '700px' }}>
      <Autocomplete
        value={result ? result : ''}
        options={dict ? dict.sort((a, b) => -b.itemName[0].localeCompare(a.itemName[0])).map((item) => item.itemName) : []}
        renderInput={(params) => (
          <TextField
            {...params}
            value={result ? result: ''}
            label={
              <Typography sx={{ color: 'white' }} component="label">
                Search…
              </Typography>
            }
            onFocus={() => setIsTextFieldSelected(true)}
            onBlur={() => setIsTextFieldSelected(false)}
            sx={{ color: 'white' }}
          />
        )}
        onChange={(event, value) => {
          if (value) {
            setResult(value);
            window.location.href = window.location.origin+`/pedestal/${value}`;
          }
        }}
        
        fullWidth={true}
      />
      <Box sx={{ pt: 1.5,pl:1,pr:.5 }}>
        {result ? (
          <Link href={`/pedestal/${result}`} underline="none">
            <SearchIcon fontSize="large" sx={{ color: amber[500] }} />
          </Link>
        ) : (
          <SearchIcon fontSize="large" color="white" />
        )}
      </Box>
    </Box>
  );
}
