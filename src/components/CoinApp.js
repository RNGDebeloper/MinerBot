import React, { useState } from 'react';
import { Box, Button, Modal, Typography, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { keyframes } from '@emotion/react';

const isDesktop = window.innerWidth > 1000;
const theme = createTheme();

// Styled components for the gold buttons
const GoldButton = styled(Button)({
  backgroundColor: 'darkorange',
  borderRadius: 15,
  margin: '0 10px',
  width: `${isDesktop ? '20vw' : '40vw'}`,
  padding: '10px 20px',
  fontFamily: 'avenir',
  fontWeight: 800,
  '&:hover': {
    backgroundColor: 'gold',
  },
});

const CoinLogo = styled(Box)({
    width: '30vw',
    [theme.breakpoints.down('md')]: {
        width: '90vw',
    }
});

// keyframes for animation
const expand = keyframes`
   from, to { width: ${isDesktop ? '30vw' : '90vw'}; }
   50% { width: ${isDesktop ? '27vw' : '84vw'}; }
`;

const fontSizeAnim = keyframes`
   from, to { font-size: ${isDesktop ? '20px' : '15px'}; }
   50% { font-size: ${isDesktop ? '20px' : '12px'}; }
`;

export default function CoinApp() {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [expandAnimation, setExpandAnimation] = useState('');
  const [fontSizeAnimation, setFontSizeAnimation] = useState('');
  const [coinCount, setCoinCount] = useState(0);
  const [audio] = useState(new Audio('https://assets.mixkit.co/active_storage/sfx/216/216.wav'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle the change of the address input
  const handleAddressChange = (event) => setAddress(event.target.value);

  const handleCoinClick = () => {
    setCoinCount(coinCount + 1);
    setExpandAnimation(`${expand} 0.3s ease`);
    setFontSizeAnimation(`${fontSizeAnim} 0.2s ease`);
    audio.play();

    setTimeout(() => {
      setExpandAnimation('');
      setFontSizeAnimation('');
    }, 500); // This should match the duration of your animation
  };


  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
      }}
    >
     
     <div style={{display: 'flex',margin: '10px', flexDirection: 'column', alignItems: 'center', background: 'rgb(0 0 0 / 21%)', color: 'white', padding: '10px', backdropFilter: 'blur(10px)', borderRadius: '20px', width: `${isDesktop ? '30vw' : '90vw'}`}}>
       <Typography variant="h4" component="p" sx={{padding: '10px', fontWeight: '800', fontFamily: 'avenir', animation: fontSizeAnimation}}>
           {coinCount} Coin
       </Typography>
     </div>

      <CoinLogo
        component="img"
        src="https://cdn3d.iconscout.com/3d/premium/thumb/shiba-inu-4984835-4159433.png"
        alt="Coin Logo"
        onClick={handleCoinClick}
        sx={{
            animation: expandAnimation,
            "&:hover": {
              cursor: 'pointer',
            }
          }}
      />

      {/* Buttons */}
      <Box sx={{ mb: 4 }}>
        <GoldButton variant="contained" onClick={handleOpen}>
          Withdraw
        </GoldButton>
        <GoldButton variant="contained">
          Ranking
        </GoldButton>
      </Box>

      {/* Withdraw Address Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter your wallet address
          </Typography>
          <TextField
            fullWidth
            autoFocus
            margin="normal"
            id="address"
            label="Address"
            type="text"
            variant="outlined"
            value={address}
            onChange={handleAddressChange}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Withdraw</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}