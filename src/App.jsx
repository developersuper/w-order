import { useState } from "react";
import QRCode from "react-qr-code";
import MenuList from "./components/MenuList";
import UserInfo from "./components/UserInfo";
import Bill from "./components/Bill";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const menus = [
  {
    title: 'Dish1',
    description: 'description, ..,.,. blabla....',
    price: 3.5,
  },
  {
    title: 'Dish2',
    description: 'description, ..,.,. blabla....',
    price: 15,
  },
  {
    title: 'Dish3',
    description: 'description, ..,.,. blabla....',
    price: 6.2
  },
];

const restaurantPhone = "+19259404978";
const userInfo = {
  name: "John Doe",
  phone: "+84833031172",
  address: "Paris",
}

function App() {
  const [counts, setCounts] = useState([...Array.from({ length: menus.length }, (x) => 0)]);
  const [QRshow, setQRshow] = useState(false);
  const [QRvalue, setQRvalue] = useState("");

  const sendOrder = () => {
    let msg = `name:${userInfo.name};phone:${userInfo.phone};address:${userInfo.address};`;
    let total = 0;
    for (let i = 0; i < menus.length; i++) {
      total += menus[i].price * counts[i];
      msg += `${menus[i].title}:${counts[i]};`;
    }
    msg += `total:${total}`;
    // console.log(msg)
    let url = `whatsapp://send?phone=${restaurantPhone}?text=${encodeURI(msg)}`;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      window.open(url);
    } else {
      setQRvalue(url);
      setQRshow(true);
    }
  }

  return (
    QRshow ? 
    <>
      <div className="flex flex-col items-center">
        <div className="max-w-64 w-64 h-auto p-2 mt-20 border border-gray-500 rounded-lg">
          <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={QRvalue}
          viewBox={`0 0 256 256`}
          />
        </div>
        <Button className="w-40 !mt-5" variant="contained" endIcon={<SendIcon />} onClick={() => setQRshow(false)}>
          OK
        </Button>
      </div>
    </> :
    <>
      <div className="p-3 md:h-screen xl:flex xl:flex-row-reverse">
        <UserInfo userInfo={userInfo} />
        <div className="p-5 xm:h-full md:px-12 md:grow">
          <p className="text-3xl text-center mb-4">Order List</p>
          <div className="flex flex-col justify-between">
            <div className="md:flex">
              <MenuList menus={menus} counts={counts} setCounts={setCounts}/>
              <Bill menus={menus} counts={counts} />
            </div>
            <Button className="md:!mt-12 w-full" variant="contained" endIcon={<SendIcon />} onClick={sendOrder}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
