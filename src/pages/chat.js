import React, { useEffect, useState } from 'react';
import supabase from 'src/utils/supabaseClient.js'
import { List, ListItem,Typography,Button,TextField,Box } from '@mui/material';
import { useUser} from '@supabase/auth-helpers-react'

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
    const user = useUser()
    useEffect(() => {
        const { data: initialData } = supabase.from('messages').select('*');
        setMessages(initialData);
      
        const subscription = supabase
          .from(`messages`)
          .on('*', payload => {
            if (payload.eventType === 'INSERT') {
              setMessages(currentMessages => [...currentMessages, payload.new]);
            } else if (payload.eventType === 'UPDATE') {
              setMessages(currentMessages => {
                const index = currentMessages.findIndex(m => m.id === payload.new.id);
                if (index !== -1) {
                  currentMessages[index] = payload.new;
                }
                return [...currentMessages];
              });
            } else if (payload.eventType === 'DELETE') {
              setMessages(currentMessages => {
                const index = currentMessages.findIndex(m => m.id === payload.old.id);
                if (index !== -1) {
                  currentMessages.splice(index, 1);
                }
                return [...currentMessages];
              });
            }
          }).subscribe();
      
        return () => {
          subscription.unsubscribe();
        };
      }, [user]);
      

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase.from('messages').insert({
      message: newMessage,
      user_id: supabase.auth.user().id,
    });

    if (error) {
      console.log('Error sending message:', error.message);
    } else {
      setNewMessage('');
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ flex: '1', overflowY: 'scroll', padding: '1rem' }}>
        <List sx={{ display: 'flex', flexDirection: 'column' }}>
          {messages.map(message => (
            <ListItem key={message.id}>
              <Typography>{message.user_id}: {message.message}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ padding: '1rem' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Message"
            variant="outlined"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" sx={{ marginTop: '1rem' }}>Send</Button>
        </form>
      </Box>
    </Box>
  );
}
