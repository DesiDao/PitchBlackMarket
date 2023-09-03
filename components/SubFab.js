import React, { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Fab, Box, Backdrop, Button, Paper, TextField, Autocomplete, FormControl, MenuItem, InputLabel, Stack, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import BasicCard from './sell_order';
import {ThemeProvider, createTheme } from '@mui/material/styles';

export default function SubFab() {
    
    const supabase = useSupabaseClient()
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [RARITY, setRarity] = useState('');
    const [RATING, setRating] = useState('');
    const [PRICE, setPrice] = useState('');
    const [ADV, setAdv] = useState('');
    const [EN1, setEN1] = useState(null);
    const [NumEN1, setNumEN1] = useState('');
    const [TexEN1, setTexEN1] = useState('');
    const [EN2, setEN2] = useState(null);
    const [NumEN2, setNumEN2] = useState('');
    const [TexEN2, setTexEN2] = useState('');
    const [EN3, setEN3] = useState(null);
    const [NumEN3, setNumEN3] = useState('');
    const [TexEN3, setTexEN3] = useState('');
    const [EN4, setEN4] = useState(null);
    const [NumEN4, setNumEN4] = useState('');
    const [TexEN4, setTexEN4] = useState('');
    const [EN5, setEN5] = useState(null);
    const [NumEN5, setNumEN5] = useState('');
    const [TexEN5, setTexEN5] = useState('');
    const [Index, setIndex] = useState(null);
    const [Enchants, setEnchants] = useState(null);
    const [User, setUser] = useState(null);
    const user = useUser()
    const [cap,setCap] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const RTskelly = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/RTfab.png";
    const FABskelly = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/fablogo.jpg";
    const scrollBG = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/messageboard.png";
    const handleClose = () => {
        
        setRarity('');
        setRating('');
        setPrice('');
        setSelectedItem(null);
        setEN1(null);
        setEN2(null);
        setEN3(null);
        setEN4(null);
        setEN5(null);
        setOpen(false);
        setNumEN1('');
        setNumEN2('');
        setNumEN3('');
        setNumEN4('');
        setNumEN5('');
        setTexEN1('');
        setTexEN2('');
        setTexEN3('');
        setTexEN4('');
        setTexEN5('');
    };
    const logoTheme = createTheme({
      typography: {
        fontFamily: [
          'Imprint MT Shadow',
          '"Helvetica Neue"'
        ].join(','),
      },
    });

    const ToggleTab = () => {
      if (user == null || user == undefined) {
        window.location.href = "http://localhost:3000/account";
      } else {
        setOpen(!open);
        getIndex();
      }
    };
    function isEnchantsDisabled(rarity, index) {
      switch (rarity) {
        case null:
        case undefined:
        case '':
        case 'Poor':
        case 'Common':
          return index >= 1;
        case 'Uncommon':
          return index >= 2;
        case 'Rare':
          return index >= 3;
        case 'Epic':
        case 'Cobalt':
          return index >= 4;
        case 'Legendary':
        case 'Rubysilver':
          return index >= 5;
        default:
          return index >= 6;
      }
    }
    
    async function getIndex(){
        try {
            setLoading(true);
      
            let { data, error } = await supabase
                .from('varList')
                .select('itemName,variable,desc,cat,special')
                
                if (data) {
                    setIndex(data);
                }

            let {data:enchants, errorr} = await supabase
                .from('enchantList')
                .select('*')

                if(enchants){
                  setEnchants(enchants);
                }
             let {data:userd, errorrr} = await supabase
                .from('profiles')
                .select(`username, status, karma,id,regAdv,fav,avatar_url`)
                .eq('id', user.id)
                .single()
                
            let {data:numAvail, errorrrr} = await supabase
                .from('sell_offers')
                .select(`offerID`)
                .eq('id', user.id)
                .eq('available',true)

                if(userd){
                  if (userd.regAdv == ''){window.location.href = "http://localhost:3000/account"}
                  setUser(userd);
                  console.log(userd.regAdv)
                  
                }
                if (numAvail){
                  console.log(numAvail.length)
                  if (numAvail.length>= 35){setCap(true);};
                }
                } catch (error) {
                console.log(error)
                }finally {
                setLoading(false)
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
        }
    }
    
    async function insertSellOrder() {
      console.log(selectedItem)
        if (cap == true){console.log('Item limit reached!');return;}
        try {
          setLoading(true);
            
          const order = {
            created_at: new Date().toISOString(), itemName: selectedItem.itemName,
            rarity: RARITY, rating: RATING, price: PRICE,
            en1:  ((selectedItem.cat=='Armor'||selectedItem.cat=='Weapon'||selectedItem.cat=='Jewelry')&&RARITY != 'Common'&&EN1!=null)? EN1:'',
            en2: ((selectedItem.cat=='Armor'||selectedItem.cat=='Weapon'||selectedItem.cat=='Jewelry')&&RARITY != 'Common' && RARITY != 'Uncommon'&&EN2!=null)? EN2:'',
            en3: ((selectedItem.cat=='Armor'||selectedItem.cat=='Weapon'||selectedItem.cat=='Jewelry')&&RARITY != 'Common' && RARITY != 'Uncommon'&& RARITY != 'Rare'&&EN3!=null)? EN3:'',
            en4: ((selectedItem.cat=='Armor'||selectedItem.cat=='Weapon'||selectedItem.cat=='Jewelry')&&RARITY != 'Common' && RARITY != 'Uncommon'&& RARITY != 'Rare'&& RARITY != 'Epic'&& RARITY != 'Cobalt'&&EN4!=null)? EN4:'',
            en5: ((selectedItem.cat=='Armor'||selectedItem.cat=='Weapon'||selectedItem.cat=='Jewelry')&&(RARITY == 'Named'||RARITY == 'Unique')&&EN5!=null)? EN5:'',
            id: user.id,
            soldBy: ADV?ADV:'Unassigned'
          };
          let { error } = await supabase.from('sell_offers').insert(order).eq('id', user.id)
          if (error) throw error
        } catch (error) {
          alert('Error inserting the order!')
          console.log(error)
          return
        } finally {
          setLoading(false);
          if (User.regAdv!=''){
            let  iTotal=parseInt(User.regAdv.split('/').filter(item => item.indexOf(ADV) > -1).toString().split(',')[2])+1
            let temp = User.regAdv.split('/').filter(item => item.indexOf(ADV) > -1).toString().split(',')
            let OG = temp.toString()
            temp[2]= iTotal.toString()
            let res = User.regAdv.replace(OG,temp.toString())
            updateAdv(res);
          }
          //handleClose();
          //location.reload();
        }
      }

      useEffect(() => {}, [ADV])
      const fieldLabels = ['Rating', 'Price'];
      const VALUE = (selectedItem?.cat  == 'Jewelry' )?'-':RATING;
      function filterRare(rar){
        if (selectedItem?.cat  != 'Collectibles'){
          switch (rar) {
            case null:
            case undefined:
            case '':
              if (selectedItem?.cat  == 'Jewelry'){
                return[ { label: 'Uncommon', color: '#00A300' },
                { label: 'Rare', color: '#0047AB' },
                { label: 'Epic', color: '#6C0BA9' },
                { label: 'Legendary', color: '#DAA520' },
                { label: 'Unique', color: '#E3D88C' }]
              }else if(selectedItem?.cat  == 'Ammunition'){
                return [{ label: 'Poor', color: '#646464' }]
              }else{
                return [{ label: 'Poor', color: '#646464' },
                { label: 'Common', color: '#DEDEDE' },
                { label: 'Uncommon', color: '#00A300' },
                { label: 'Rare', color: '#0047AB' },
                { label: 'Epic', color: '#6C0BA9' },
                { label: 'Legendary', color: '#DAA520' },
                { label: 'Unique', color: '#E3D88C' }]
              };
            case 'Cobalt':
              return[{ label: 'Cobalt', color: '#00008B' }];
            case 'Rubysilver':
              return [{ label: 'Rubysilver', color: '#8B0000' }];
            case 'Named':
              return [{ label: 'Named', color: '#E3D88C' }];
          }
        }else{
          switch (rar) {
            case null:
            case undefined:
            case '':
              return [{ label: 'Cracked', color: '#646464' },
                { label: 'Flawed', color: '#DEDEDE' },
                { label: 'Normal', color: '#00A300' },
                { label: 'Exquisite', color: '#0047AB' },
                { label: 'Perfect', color: '#6C0BA9' },
                { label: 'Royal', color: '#DAA520' }];
          }
        }
      }
    return(
        <Box sx={{position:'fixed', bottom:50, right:50,zIndex: 999}}>
            <Fab color="warning" aria-label="add" sx={{width:90,height:90,zIndex: 999}} onClick={ToggleTab}>
            <img src={FABskelly} style={{ width:110,height:110,borderRadius: '50%', border:'3px solid #DAA520'}}/>
            
            </Fab>
            <Backdrop
                sx={{ color: '#fff', zIndex: 999 }}
                open={open}
            >
                <Paper component={Box}  sx={{ zIndex: 999, height:830, width: 900,p:2,backgroundColor:'grey.700',borderRadius: '16px',pt:1 }}>
                <ThemeProvider theme={logoTheme}>
                <Box sx={{display: 'flex', flexDirection:'row',pt:2}}>
                <Stack sx={{width:'850px',mt:0}}>
                  <Box sx={{display:'flex',justifyContent:'center',pb:0,mb:0, height:0}}><Typography variant="h4" color='black'>                  Item Submission Form</Typography></Box>
                  <Box sx={{display:'flex',justifyContent:'center',pt:0,mt:0 }}><Typography variant="h4" color='#FFC90E'>                   ____________________</Typography></Box>
                </Stack>
                
                <Box sx={{ mt:-6,mb:-11}}><img src={RTskelly} style={{ width: '200px' }}/></Box>
                </Box>
              </ThemeProvider>
                <Box display='flex' flexDirection='row'sx={{backgroundColor:'#ddd6cd',border:'5px double black'}}>
                <Box width={300} sx={{ml:4,mr:14,mt:5, pb:5}}>
                <FormControl >
                    
                    <Autocomplete
                        disablePortal
                        disabled={cap==true}
                        clearOnEscape={false} // Prevent clearing on Escape key
                        clearOnBlur={false}
                        value={selectedItem == ''?'Choose Item...':selectedItem}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setSelectedItem(newValue);
                            console.log(newValue);
                          } else {
                            setSelectedItem('');
                          }
                          if (selectedItem?.cat === 'Jewelry') {
                            setRating('-');
                          } else {
                            setRating('');
                          }
                        }}
                        id="sell-order-item-names"
                        isOptionEqualToValue={(option, value) => option?.itemName === value?.itemName && option?.cat === value?.cat}
                        options={Index?.sort((a, b) => -b.itemName[0].localeCompare(a.itemName[0])) || []}
                        getOptionLabel={(option) => `${option.itemName}`}
                        sx={{ width: 400 }}
                        renderInput={(params) => <TextField {...params} label={cap?"Item limit reached!":"Name"} />}
                    />
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">{cap?"Item limit reached!":"Sold By"}</InputLabel>
                      <Select
                        disabled={selectedItem == null || selectedItem == ''||cap==true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ADV}
                        label={cap?"Item limit reached!":"Sold By"}
                        onChange={(event) => {
                          const newValue = event.target.value;
                          if (newValue) {
                            setAdv(newValue);
                          } else {
                            setAdv(null);
                          }
                        }}
                        sx={{ width: 400 }}
                      >
                        {User?.regAdv ? (
                          User.regAdv.split('/').map((item) => (
                            <MenuItem key={item.split(',')[0]} value={item.split(',')[0]}>
                              <Box display="flex" flexDirection="row">
                                {item.split(',')[0]}
                              </Box>
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No data available</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">{cap?"Item limit reached!":"Rarity"}</InputLabel>
                      <Select
                        disabled={selectedItem == null|| selectedItem == ''||cap==true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={RARITY}
                        label={cap?"Item limit reached!":"Rarity"}
                        onChange={(event, newValue) => {
                          if (newValue) {setRarity(event.target.value);}
                          else setRarity(null);
                        }}
                        sx={{ width: 400 }}
                        
                      >
                        {selectedItem == null? '' : filterRare(selectedItem?.special).map((item) => (
                          <MenuItem value={item.label}>
                            <Box display="flex" flexDirection="row">
                              <Box width={20} height={20} backgroundColor={item.color} border="1px solid black" />
                                
                              {item.label.toUpperCase()}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {/* RATING AND PRICE */}
                    {fieldLabels.map((label) => (
                        <TextField
                        
                            disabled={selectedItem == null|| selectedItem == ''}
                            sx={{ width: 400 }}
                            key={label}
                            label={(selectedItem?.cat === 'Consumable' || selectedItem?.cat === 'Ammunition' || selectedItem?.cat === 'Material'|| selectedItem?.cat === 'Utility'|| selectedItem?.cat === 'Collectibles')&& label=== 'Rating' ?'Quantity':label}
                            value={label === 'Rating'? VALUE:PRICE}
                            onChange={(event) => {
                              if (selectedItem?.cat == 'Jewelry'){
                                setRating('-');
                              };
                              const regex = (label == 'Rating')? /^\d{0,2}$/:/^\d{0,7}$/;
                              if (regex.test(event.target.value)) {
                              const setter = `set${label.charAt(0).toUpperCase()}${label.slice(1)}`; //setRarity, etc
                              return eval(`${setter}(event.target.value)`);
                              };
                              
                          }}
                        />
                    ))}
                    <Stack direction="column">
                      {[1, 2, 3, 4, 5].map((index) => (
                        <Stack direction="row" key={index}>
                          <TextField
                            disabled={selectedItem == null || isEnchantsDisabled(RARITY, index) ||selectedItem.cat == 'Material' || selectedItem.cat == 'Utility' ||selectedItem.cat == 'Consumable'|| selectedItem == ''||selectedItem.cat == 'Collectibles'||cap==true}
                            sx={{ width: 60 }}
                            label={cap?"!!!!!":"#"}
                            value={eval(`NumEN${index}`)}
                            onChange={(event) => {
                              const regex = /^\d{0,3}(\.\d{0,1})?$/;
                              if (regex.test(event.target.value)) {
                                eval(`setNumEN${index}(event.target.value)`);
                                if (eval(`TexEN${index}`) !== '') {
                                  
                                  eval(`setEN${index}(\`\${event.target.value} \${TexEN${index}}\`)`);
                                }
                              }
                            }}
                            type="text"
                          />
                          {Enchants && (
                            <Autocomplete
                              autoSelect
                              disabled={selectedItem == null || isEnchantsDisabled(RARITY, index) || selectedItem.cat == 'Material' || selectedItem.cat == 'Utility' ||selectedItem.cat == 'Consumable'|| selectedItem == ''||selectedItem.cat == 'Collectibles'||cap==true}
                              sx={{ width: 340 }}
                              options={Enchants ? Enchants.sort((a, b) => a.name.localeCompare(b.name)) : []}
                              getOptionLabel={(option) => option.name}
                              onChange={(event, value) => {
                                if (value) {
                                  eval(`setTexEN${index}(value.name)`);
                                  if (`NumEN${index}` !== '') {
                                    eval(`setEN${index}(\`\${NumEN${index}} \${value.name}\`)`);
                                  }else{
                                    eval(`setEN${index}('')`);
                                  };
                                } else {
                                  eval(`setTexEN${index}('')`);
                                  eval(`setEN${index}('')`);
                                }
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label={cap?"Item limit reached!":"Enchantment"}
                                  value={eval(`TexEN${index}`) || null}
                                  onChange={(event) => {
                                    const inputValue = event.target.value;
                                    if (/^[a-zA-Z\s']+$/i.test(inputValue) && inputValue.length <= 4) {
                                      eval(`setTexEN${index}(inputValue)`);
                                      if (eval(`NumEN${index}`) !== '') {
                                        eval(`setEN${index}(\`\${NumEN${index}} \${inputValue}\`)`);
                                      }
                                    }
                                  }}
                                  
                                />
                              )}
                            />
                          )}
                        </Stack>
                      ))}
                    </Stack>


                    <Button width={500} disabled={selectedItem==null || selectedItem==''|| RARITY == '' || RARITY == '0'|| PRICE == '0'|| PRICE == ''|| 
                      RATING == '' || RATING == '0'||ADV==null||ADV==''||ADV==' '||cap==true} variant="contained" color="success" 
                      onClick={() => insertSellOrder()} >{cap == false?'submit':'Item Limit Reached'}</Button>
                    <Button width={500} variant="contained" color="error" onClick={() => handleClose()} >cancel</Button>
                </FormControl>
                </Box>
                <Stack>
                <Box sx={{ position:'fixed',ml:-4, mt:10}}><img src={scrollBG} style={{ width: '450px' }}/></Box>
                  <Box sx={{mt:10, minWidth:'300px', maxHeight:'100px',p:1,pt:7, textAlign:'center', zIndex:999}}>
                  <ThemeProvider theme={logoTheme}>
                    <Typography variant="h4" color='#FFC90E'>Sample Display</Typography>
                    </ThemeProvider>
                  </Box>
                  <Box sx={{ minWidth:'400px', maxHeight:'300px',p:1}}>
                    {selectedItem != null && selectedItem != '' &&RARITY != '' && PRICE != '0' && PRICE != null && PRICE != '' && RATING != '0' && RATING != null && RATING != ''&&cap==false? 
                    <BasicCard item={{'itemName': selectedItem.itemName, 'rarity': RARITY, 'price': PRICE, 'rating': RATING, 
                      'en1': (RARITY != 'Common')? EN1:'',
                      'en2': (RARITY != 'Common' && RARITY != 'Uncommon')? EN2:'', 
                      'en3': (RARITY != 'Common' && RARITY != 'Uncommon'&& RARITY != 'Rare')? EN3:'',
                      'en4': (RARITY == 'Legendary' || RARITY == 'Rubysilver'||RARITY == 'Named'||RARITY == 'Unique')? EN4:'',
                      'en5': (RARITY == 'Named'||RARITY == 'Unique')? EN5:'',
                      'soldBy': ADV?ADV:'Unassigned', 
                      offerID: 'null','varList':{cat:selectedItem.cat,'variable': selectedItem.variable,'desc':selectedItem.desc},
                      'profiles':{'username': User.username, 'status': User.status, 'karma': User.karma, 'id': User.id,'avatar_url':User.avatar_url}}} fav={'000/'}/> : null}
                </Box>
                </Stack>
                </Box>
                <ThemeProvider theme={logoTheme}>
                <Stack sx={{width:'850px',mt:0}}>
                  <Box sx={{display:'flex',justifyContent: 'center'}}><Typography variant="h6" color='black' textTransform='capitalize'>POOR AND ABOVE RARITY ITEMS ONLY ... </Typography>&nbsp;<Typography variant="h6" color='darkred' textTransform='capitalize'>NO STARTER GEAR!</Typography></Box>
                </Stack>
              </ThemeProvider>
                </Paper>
            </Backdrop>
        </Box>
        );
}

