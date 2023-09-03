import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMediaQuery } from 'react-responsive'
import {ThemeProvider, createTheme } from '@mui/material/styles';

export default function MsgBox(){
    const skelly = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/Undead%20traveling-merchant%20@%20300.png";
    const isMobile = useMediaQuery({ maxWidth: 767 })
    
    return(
        <Box sx={{
            border:'3px solid #FFC90E',
            minWidth:'310px',
            maxHeight:'400px',
            backgroundColor: '#272727',
            position: 'relative'  // added property
        }}>
            <Box sx={{border:'2px solid #FFC90E',m:1,mb:0, height:'96%',overflow:'visible'}}>
                <Typography variant={"h5"} sx={{fontWeight: 'bold'}}>WELCOME</Typography>
                <Typography variant={"subtitle1"}>- Please register to sell items -</Typography>
                <Typography variant={"subtitle1"}>- Physically verify all purchased items -</Typography>
                <Typography variant={"subtitle1"}>- Haggling's cool, harassing's 4 fools -</Typography>
                <Typography variant={"subtitle1"}>- Updates and Upgrades on the reg -</Typography>
                <Typography variant={"subtitle1"}>Physically. verify. all. purchased. items.</Typography>
                <Typography variant={"subtitle1"}>- Any support is deeply appreciated!! -</Typography>
                <Box sx={{
                    position:'absolute',
                    bottom:'0',
                    pb:3,
                    width:'355px',
                    left: '50%',  // added property
                    transform: 'translateX(-50%)'  // added property
                }}>
                    <Typography variant="h5" sx={{fontWeight:'bold',fontStyle: 'italic'}}>We don't care what</Typography>
                    <Typography variant="h5" sx={{fontWeight:'bold',fontStyle: 'italic'}}>- or who -</Typography>
                    <Typography variant="h5" sx={{fontWeight:'bold',fontStyle: 'italic'}}>you got it from!</Typography>
                </Box>
            </Box>
            <Box sx={{'@media (max-width: 767px)': {visibility:'hidden'}}}>
                <img src={skelly} />
            </Box>
        </Box>
    );
}
