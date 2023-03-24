import { useState } from "react";
import QRCode from "react-qr-code";
import MenuList from "./components/MenuList";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Container from '@mui/material/Container';

const menus = [
  {
    title: 'Dish1',
    description: 'description, ..,.,. blabla....',
  },
  {
    title: 'Dish2',
    description: 'description, ..,.,. blabla....',
  },
  {
    title: 'Dish3',
    description: 'description, ..,.,. blabla....',
  },
]

function App() {
  // const [phoneNumber, setPhoneNumber] = useState("84833031172");
  // const [count, setCount] = useState(0);
  // const [price, setPrice] = useState(100);
  // const [started, setStarted] = useState(false);
  // const [QRValue, setQRValue] = useState("");
  

  // const Navbar = () => {
  //   return (
  //     <div className="px-4 py-3 bg-white shadow-lg">
  //       <img className="" src="logo.svg" alt="logo" />
  //     </div>
  //   );
  // }

  // const sendToWhatsapp = () => {
  //   let message = `price: ${price}, count: ${count}, total: ${count * price}`;
  //   let url = `https://wa.me/${phoneNumber}?text=${encodeURI(message)}`;
  //   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  //     // The user is accessing the website from a mobile device
  //     window.open(url, '_blank');
  //   } else {
  //     // The user is accessing the website from a desktop PC
  //     setStarted(true);
  //     setQRValue(url);
  //   }
  // }

  return (
    <>
    <CssBaseline />
    <Container maxWidth="sm">
      <MenuList/>
      <Button variant="contained" sx={{width: '100%'}} endIcon={<SendIcon />}>
        Send
      </Button>
    </Container>
  </>
  );
}

export default App;
