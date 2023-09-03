import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

function ClarkConvo({ karma, name, id, empty }) {
  const ID =id
  const EMPTY = empty
  const NAME = name
  const [showMessage, setShowMessage] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState('');
  let temp
  if (ID !='self'){temp = {"Index": "Ahh, keeping an eye on the competition? *snicker* I won''t tell"}}
  const remarks = !ID?{"Index": "Ahh, keeping an eye on the competition? *snicker* I won''t tell"}:{
    "Clay": " New merchants to the left...Please have your paperwork ready for processing.",
    "Iron": " ...What? You know how this goes by now, right?",
    "Bronze": " Aren't you?...Right, what can I do for you?",
    "Silver": ` I see you're making your way up the ladder, Merchant ${name}... keep it up.`,
    "Gold": ` Business has boomed with your aid, Master ${name}! At your service...`,
    "Black Gold":` Greetings, Lord ${name}! A pleasure as always. What do you need, I'm sure we have it?!!`,
    "Remove":"The item has been removed for your sales list, per your request! You can always resubmit the request if needed!",
    "Edit": "The order has been edited per your request!",
    "Register": "A new member has been added to your party!",
    "Empty": "A new member has been added to your party!",



  };
  const alert = EMPTY||!NAME?' Please finish registering your Discord name and at least one adventurer. You can\'t spell profit without paperwork!':" New merchants to the left...Please have your paperwork ready for processing."
  const MESS = ID!='self'?" Ahh, keeping an eye on the competition? *snicker* I won't tell":alert

  const coin=[
    {req:0,alt:"Clay",url: "clay_badge.png"},
    {req:1,alt:"Iron",url: "iron_badge.png"},
    {req:10,alt:"Bronze",url: "bronze_badge.png"},
    {req:50,alt:"Silver",url: "silver_badge.png"},
    {req:100,alt:"Gold",url: "gold_badge.png"},
    {req:1000,alt:"Black Gold",url: "black_gold.png"}
  ];
  function getCoinValue(karma, i=0) {
    let highestReq = -1;
    let highestCoin = null;
    let nextCoin = null;
  
    for (const coinObj of coin) {
      
      if (karma >= coinObj.req && coinObj.req > highestReq) {
        highestReq = coinObj.req;
        highestCoin = coinObj;
      }else{
        nextCoin = coinObj;
        return (i==0)?highestCoin:nextCoin;
      }
      if (coinObj.alt == "Black Gold") {
        return highestCoin;
      }
    }
    console.log(highestCoin)
    return (i==0)?highestCoin:nextCoin;//[highestCoin, nextCoin, nextCoin.req]
  }
  useEffect(() => {
    setDisplayedMessage(" ");
    let i = 0;
    const timeoutId = setTimeout(() => {
      setShowMessage(true);
      const intervalId = setInterval(() => {//getCoinValue(karma).alt => "Clay"
        if (i === MESS.length-1) {
          clearInterval(intervalId);
        } else if(i==0){
          setDisplayedMessage((prevDisplayedMessage) => prevDisplayedMessage + MESS[1]);
          i++;
        }else {
          setDisplayedMessage((prevDisplayedMessage) => prevDisplayedMessage + MESS[i]);
          i++;
        }
      }, 35);
      return () => {
      clearInterval(intervalId);
    };
    }, 700);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [karma]);

  
  return (
    
    <Typography variant="h4">
      {showMessage&&displayedMessage ? displayedMessage : ''}
    </Typography>
    
  );
}
export default ClarkConvo;