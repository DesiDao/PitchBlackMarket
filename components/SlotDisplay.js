import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import {Box,Link,FormControl, Button, Skeleton, Stack} from '@mui/material';

export default function SlotDisplay(props) {
    const isItemPage = props?.gear == '/'?true:false;
    const Class = props?.gear.split('/');

    function getImage(str){
        return process.env.NEXT_PUBLIC_SUPABASE_URL+`/storage/v1/object/public/imagelist/${str}Display.${str=="Gear"?'png':'webp'}`;
    }

    function filter(cat,pro){
        switch(pro){
            case 1:
                return (cat!=props.SLOT)? 'grey.800':'#FFC90E'
            case 2:
                return (cat!=props.SLOT)? 'pulse':'wave'
        }
        
    }
    //Either return a gold square or an image of the image itself. The item needs to fit in the same dimensions as the box.
    function flexSlot(Width, Height, Slot, Name){
        return((Name==' '|| Name == null)?
            <Skeleton variant="rectangular" width={Width} height={Height} sx={{ bgcolor: filter(Slot,1) }} animation={filter(Slot,2)}/>:<img width={Width} height={Height} src={process.env.NEXT_PUBLIC_SUPABASE_URL+`/storage/v1/object/public/imagelist/${Name.replace(/ /g, '_')}.png`} />
        );
    }
    function updateClass(str){
        setClass(str);
    }

    function isTwoHanded(str){
        if (Class[0]==Class[1]) return 'Two-hand';
    }

    const GearDisplay =<Stack spacing={.5} direction="row">
    <Box width={2}/>
    <Stack spacing={1} >
            <Box height={2}/>
            <Stack direction="row">
            <Box sx={{ position: 'absolute', width: '75px', height: '180px',zIndex:1, mt:4,ml:1 }}>
                    {isItemPage?<Skeleton variant="rectangular" width={66} height={160} sx={{ bgcolor: filter(props.SLOT != 'Two-hand'?'Main-hand':'Two-hand',1) }} animation={filter('Main-hand',2)}/>: flexSlot(66,160,'Main-hand',Class[0])}
                            </Box>
            <Box sx={{ position: 'relative', overflow: 'hidden', width: '80px', height: '200px',zIndex:-1 }}>
                <img
                    src={getImage('Weapon')}
                    style={{ width: 'auto', height: '100%', objectPosition: 'left center', objectFit: 'cover' }}
                />  
            </Box>
            <Box sx={{ position: 'absolute', width: '75px', height: '180px',zIndex:1, mt:4, ml:10 }}>
                    {isItemPage?<Skeleton variant="rectangular" width={66} height={160} sx={{ bgcolor: filter(props.SLOT != 'Two-hand'?'Off-hand': 'Two-hand',1) }} animation={filter('Off-hand',2)}/>:flexSlot(66,160,'Off-hand',Class[1])}
                            </Box>
            <Box sx={{ position: 'relative', overflow: 'hidden', width: '80px', height: '200px',transform: 'scaleX(-1)',ml:-.8 }}>
                <img
                    src={getImage('Weapon')}
                    style={{ width: 'auto', height: '100%', objectPosition: 'right center', objectFit: 'cover' }}
                />
            </Box>
            </Stack>
            <Stack direction="row">
                <Box width={2} height={1}/>
                <Stack spacing={.5}>
                <Box sx={{ position: 'relative', width: '75px', height: '200px' }}>
                    <Box sx={{ position: 'absolute', width: '80px', height: '80px',zIndex:1, mt:2.5, ml:1 }}>
                    {isItemPage?<Skeleton variant="rectangular" width={50} height={52} sx={{ bgcolor: filter('Gear',1) }} animation={filter('Gear',2)}/>:flexSlot(60.5,54,'Gear',Class[13])}
                    </Box>
                    <Box sx={{ position: 'absolute', width: '80px', height: '40px',zIndex:1, mt:10, ml:1 }}>
                    {isItemPage?<Skeleton variant="rectangular" width={50} height={52} sx={{ bgcolor: filter('Gear',1) }} animation={filter('Gear',2)}/>:flexSlot(60.5,54,'Gear',Class[14])}
                    </Box>
                    <Box sx={{ position: 'absolute', width: '80px', height: '40px',zIndex:1, mt:17, ml:1 }}>
                    {isItemPage?<Skeleton variant="rectangular" width={50} height={52} sx={{ bgcolor: filter('Gear',1) }} animation={filter('Gear',2)}/>:flexSlot(60.5,54,'Gear',Class[15])}
                    </Box>
                <img
                    src={getImage('Gear')}
                    style={{ width: '80px', height: '100%'}}
                />
                
                </Box>
                </Stack>
                
                <Box width={10} />
                <Stack sx={{pt:.5}}>
                <Box sx={{ position: 'absolute', pl:.5,pt:.5,width: '70px', height: '70px',zIndex:1}}>
                    {isItemPage?<Skeleton variant="rectangular" width={54} height={54} sx={{ bgcolor: filter('Hands',1) }} animation={filter('Hands',2)}/>:flexSlot(70,70,'Hands',Class[6])}
                </Box>
                <img
                    src={getImage('HeadHandsFeet')}
                    style={{ width: '80px', height: '80px'}}
                />
                
                <Stack sx={{pt:.5}} direction="row">
                    <Box width={30} height={20}/>
                    <Box sx={{ position: 'absolute', pl:4.5,pt:1,width: '45px', height: '45px',zIndex:1}}>
                        {isItemPage?<Skeleton variant="rectangular" width={45} height={45} sx={{ bgcolor: filter('Ring',1) }} animation={filter('Ring',2)}/>:flexSlot(35,35,'Ring',Class[10])}
                    </Box>
                    <img
                    src={getImage('Jewelry')}
                    style={{ width: '50px', height: '50px'}}
                    />
                </Stack>
                </Stack>
            </Stack>
            </Stack>
    
        <Stack spacing={1}>
        <Box height={85}/>
            <Stack direction="row">

            <Box sx={{ position: 'absolute',width: '70px', height: '70px',zIndex:1,pt:.5,pl:.5}}>
                    {isItemPage?<Skeleton variant="rectangular" width={70} height={70} sx={{ bgcolor: filter('Head',1) }} animation={filter('Head',2)}/>:flexSlot(70,70,'Head',Class[4])}
            </Box>
            <img
                    src={getImage('HeadHandsFeet')}
                    style={{ width: '80px', height: '80px'}}
                />
            <Stack>
                <Box width={40} height={24}/>
                <Box sx={{ position: 'absolute', pl:1,pt:4,width: '45px', height: '45px',zIndex:1}}>
                        {isItemPage?<Skeleton variant="rectangular" width={45} height={45} sx={{ bgcolor: filter('Necklace',1) }} animation={filter('Necklace',2)}/>:flexSlot(35,35,'Necklace',Class[12])}
                    </Box>
                    <img
                    src={getImage('Jewelry')}
                    style={{ width: '50px', height: '50px'}}
                    />
            </Stack>
            </Stack>
            <Stack direction="row">
                <Box sx={{ position: 'absolute',width: '80px', height: '100px',zIndex:1,pl:.5,pt:1}}>
                {isItemPage?<Skeleton variant="rectangular" width={80} height={100} sx={{ bgcolor: filter('Armor',1) }} animation={filter('Armor',2)}/>:flexSlot(80,100,'Armor',Class[5])}
                </Box>
                <img
                    src={getImage('ChestLegs')}
                    style={{ width: '90px', height: '120px'}}
                />
            <Stack>
                <Box width={.5} height={40}/>
                <Box sx={{ position: 'absolute',width: '70px', height: '70px',zIndex:1, pt:5.5, pl:.5}}>
                    {isItemPage?<Skeleton variant="rectangular" width={70} height={70} sx={{ bgcolor: filter('Back',1) }} animation={filter('Back',2)}/>:flexSlot(70,70,'Back',Class[9])}
                </Box>
            <img
                    src={getImage('HeadHandsFeet')}
                    style={{ width: '80px', height: '80px'}}
                />
            </Stack>
            </Stack>
            <Stack direction="row">
            <Box sx={{ position: 'absolute',width: '70px', height: '70px',zIndex:1, pt:1.5,pl:1}}>
            {isItemPage?<Skeleton variant="rectangular" width={72} height={100} sx={{ bgcolor: filter('Legs',1) }} animation={filter('Legs',2)}/>:flexSlot(72,100,'Legs',Class[7])}
            </Box>
            <img
                    src={getImage('ChestLegs')}
                    style={{ width: '90px', height: '120px'}}
                />
            <Stack>
                <Box sx={{ position: 'absolute', pl:1,pt:1,width: '45px', height: '45px',zIndex:1}}>
                        {isItemPage?<Skeleton variant="rectangular" width={45} height={45} sx={{ bgcolor: filter('Ring',1) }} animation={filter('Ring',2)}/>:flexSlot(35,35,'Ring',Class[11])}
                    </Box>
                    <img
                    src={getImage('Jewelry')}
                    style={{ width: '50px', height: '50px'}}
                    />
                <Box width={2} height={10}/>
                <Box sx={{ position: 'absolute',width: '70px', height: '70px',zIndex:1, pt:8, pl:.5}}>
                    {isItemPage?<Skeleton variant="rectangular" width={70} height={70} sx={{ bgcolor: filter('Feet',1) }} animation={filter('Feet',2)}/>:flexSlot(70,70,'Feet',Class[8])}
                </Box>
                <img
                        src={getImage('HeadHandsFeet')}
                        style={{ width: '80px', height: '80px',marginBottom:5 }}
                    />
            </Stack>
            </Stack>
        </Stack>
        </Stack>;
         
return(
    <Box  width='520px' maxHeight='600px' sx={{bgcolor:'grey.700',pl:1.5}}>
        <Box sx={{ position: 'relative' }}>
            <img src={getImage('BG')} style={{ width: '500px', zIndex: -20 }} />
            <Button><Box sx={{ position: 'absolute', bottom: 270, left: -15, zIndex: 1 }}>
                <img src={getImage('Perk')} style={{ width: '100px' }} />
            </Box></Button>
            <Button><Box sx={{ position: 'absolute', bottom: 270, left: 351, zIndex: 1 }}>
                <img src={getImage('Perk')} style={{ width: '100px' }} />
            </Box></Button>
            <Button><Box sx={{ position: 'absolute', bottom: 130, left: -143, zIndex: 1 }}>
                <img src={getImage('Perk')} style={{ width: '100px' }} />
            </Box></Button>
            <Button><Box sx={{ position: 'absolute', bottom: 130, left: 224, zIndex: 1 }}>
                <img src={getImage('Perk')} style={{ width: '100px' }} />
            </Box></Button>
            <Button><Box sx={{ position: 'absolute', bottom: -5, left: -270, zIndex: 1 }}>
                <img src={getImage('Skill')} style={{ width: '100px' }} />
            </Box></Button>
            <Button><Box sx={{ position: 'absolute', bottom: -5, left: 95, zIndex: 1 }}>
                <img src={getImage('Skill')} style={{ width: '100px' }} />
            </Box></Button>
            <Box sx={{ position: 'absolute', bottom: 65, left: 80, zIndex: 1 }}>{GearDisplay}</Box>
        </Box>  
        </Box>
    );
}