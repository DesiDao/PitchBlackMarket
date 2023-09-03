import { Auth,Provider } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '/components/Account'
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Nav from 'components/Nav';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Imprint MT Shadow',
      '"Helvetica Neue"',
      'EB Garamond',
      'Montserrat'
    ].join(','),
  },
});
const Home = () => {
  const session = useSession()
  const USER = session?{
    'email':session?.user.user_metadata.email,
    'username': session?.user.user_metadata.custom_claims.global_name,
    'dUsername':session?.user.user_metadata.full_name,
    'avatar':session?.user.user_metadata.picture,

  }:null;
  const merchLogo = process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imagelist/PGMerchant.png"
  const supabase = useSupabaseClient()
  return (
        <Box>
            
        {!session? (<Box><Nav />
            
            <Box sx={{ height:700, width:'100%',position:'absolute', top:50,  backgroundColor: 'black', zIndex:100}}>
            <ThemeProvider theme={theme}><Typography variant='h5'>
              Notice:
              Until Ironmace has either created a verification tool for their accounts or Dark and Darker gets added back to Steam all account information will remain tied to your Discord account. Come join the Discord channel!
              Make sure you register (super simple) at least one of your characters! You can't post items for sale if you don't!
              A lot of the item statistics are inaccurate as all damages are still beig actively changed. Please bear with any inconsistencies (or feel feel to contact me about it)</Typography> <Typography variant='h5' color='red'>TLDR; EMAIL REGISTRATION IS DISABLED, DISCORD ONLY ~SS
              </Typography></ThemeProvider>
              
              <Box display='flex'>
                <img style={{maxHeight: 400}} src={merchLogo} />
                <Box sx={{display:'flex',position:'relative',left:-150, top:375, backgroundColor:'grey.700',height:'25px'}}><ThemeProvider theme={theme}><Typography variant='h6'>Soulheart Sutler</Typography></ThemeProvider></Box>
              <Box sx={{width:'200px'}}><Auth 
                supabaseClient={supabase} 
                providers={["discord"]}
                appearance={{ theme: ThemeSupa }} 
                theme="dark" 
                signInOptions={['discord']}
            /></Box></Box>
              
              </Box>
                
                </Box>
        ) : (
            <Account session={session} id ={'self'} meta={USER?USER:null}/>
        )}
        </Box>
  )
}

export default Home