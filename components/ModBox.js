import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
const deetsBoxStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    borderTop: 0,
    textAlign: 'center'
};

export default function ModBox(props) {
    const itemDeets = props.props.baseModifiers.split('/').map((elem) => {
        return { label: elem }
      });
    return(
        <div>
            <Typography variant='h5' sx={{...deetsBoxStyles,fontWeight:'bold'}}>MODIFIERS</Typography>
            <Divider />
            {itemDeets.map((boxProps, index) => (
            <Box key={index} sx={{...deetsBoxStyles, height: '20px',fontSize: 18 }}>
                <List>
                    {boxProps.label}
                </List>
            </Box>

            ))}
        </div> 
        );       
}