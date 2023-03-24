import { useState } from "react";
import QRCode from "react-qr-code";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("84833031172");
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(100);
  const [started, setStarted] = useState(false);
  const [QRValue, setQRValue] = useState("");
  
  const addCart = () => {
    setCount(count + 1);
  }

  const sendToWhatsapp = () => {
    let message = `price: ${price}, count: ${count}, total: ${count * price}`;
    let url = `https://wa.me/${phoneNumber}?text=${encodeURI(message)}`;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      // The user is accessing the website from a mobile device
      window.open(url, '_blank');
    } else {
      // The user is accessing the website from a desktop PC
      setStarted(true);
      setQRValue(url);
    }
  }

  return (
    <div className="App w-screen h-screen bg-gray-100">
      <div className="px-4 py-3 bg-white shadow-lg">
        <img className="" src="logo.svg" alt="logo" />
      </div>

      <div className="flex justify-around p-5 pt-20">
        <div className="w-96 h-96 p-4 rounded-lg bg-white shadow-lg flex items-center flex-col">
          <p className="flex justify-between text-3xl">
            <span>Title</span>
          </p>
          <i className="fa fa-shopping-cart text-[200px]"></i>
          <button className="border border-gray-500 hover:bg-gray-300 mt-16 px-10 py-1 text-xl rounded cursor-pointer" onClick={addCart}>
            Add to Cart<i className="ml-5 fa fa-cart-plus"></i>
          </button>
        </div>

        <div className="flex flex-col justify-between">
          <div className="mt-5">
            <p className="flex justify-between mt-6 ml-2 text-3xl">
              <span>price: </span>
              <input className="text-right w-32 ml-3 pr-1 border rounded border-gray-500 bg-white" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </p>
            <p className="flex justify-between mt-6 pb-3 ml-2 text-3xl border-b border-b-gray-500 border-b-2">
              <span>count: </span>
              <span className="mr-5">{count}</span>
            </p>
            <p className="flex justify-between mt-3 ml-2 text-3xl">
              <span>total: </span>
              <span className="mr-5">{count * price}</span>
            </p>
            <p className="flex justify-between mt-6 ml-2 text-3xl">
              <span>to: </span>
              <span className="mx-5">+{phoneNumber}</span>
            </p>
          </div>

          <button className="border border-gray-500 hover:bg-gray-300 px-5 mb-8 py-1 text-xl rounded cursor-pointer" onClick={sendToWhatsapp}>
            Send to Whatsapp
          </button>
        </div>

        <div className="w-96 p-4 border-2 border-gray-500 rounded-lg">
          {
            started &&
            <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={QRValue}
            viewBox={`0 0 256 256`}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
