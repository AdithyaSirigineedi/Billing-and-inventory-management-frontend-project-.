import { v4 as uuid } from 'uuid';
import WirelessMouseImage from '../images/wirelessmouse.webp';
import BluetoothImage from '../images/bluetoothheadset.jpg';
import USBCImage from '../images/usb-c.jpg';
import smartledImage from '../images/smartledbulb.avif';
import MechinicalkeyImage from '../images/mechinalkeyboard.jpg';
import SSDImage from '../images/ssd.png';
import smartWatchImage from '../images/smartwatch.avif';
import ElectricKettleImage from '../images/electricalkettle.jpeg';
import laptopstandImage from '../images/laptopstand.jpg';
import backpackImage from '../images/backback.webp';
import yogamatImage from '../images/yogamat.jpeg';
import deskImage from '../images/officedesk.jpg';
import gamingchairImage from '../images/gamingchair.webp';
import wirelesschargerImage from '../images/wirelesscharger.jpg';
import noisemachineImage from '../images/noisemachine.jpg';

const productDetails = [
  {
    productimage:WirelessMouseImage,
    id: uuid(),
    productname: "Wireless Mouse",
    productprice: "$25.99",
    productdescription: "Ergonomic wireless mouse with adjustable DPI and long battery life."
  },
  {
    productimage:BluetoothImage,
    id: uuid(),
    productname: "Bluetooth Headphones",
    productprice: "$59.99",
    productdescription: "Noise-canceling over-ear headphones with 20 hours of battery life."
  },
  {
    productimage:USBCImage,
    id: uuid(),
    productname: "USB-C Hub",
    productprice: "$34.99",
    productdescription: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader support."
  },
  {
    productimage:smartledImage,
    id: uuid(),
    productname: "Smart LED Bulb",
    productprice: "$14.99",
    productdescription: "Wi-Fi enabled smart bulb with color-changing and voice control support."
  },
  {
    productimage:MechinicalkeyImage,
    id: uuid(),
    productname: "Mechanical Keyboard",
    productprice: "$89.99",
    productdescription: "RGB backlit mechanical keyboard with blue switches and detachable wrist rest."
  },
  {
    productimage:SSDImage,
    id: uuid(),
    productname: "Portable SSD 1TB",
    productprice: "$119.99",
    productdescription: "High-speed external solid state drive with USB 3.2 Gen2 support."
  },
  {
    productimage:smartWatchImage,
    id: uuid(),
    productname: "Smart Watch",
    productprice: "$149.99",
    productdescription: "Fitness tracking smartwatch with heart rate monitor and GPS."
  },
  {
    productimage:ElectricKettleImage,
    id: uuid(),
    productname: "Electric Kettle",
    productprice: "$39.99",
    productdescription: "Stainless steel electric kettle with temperature control and auto shut-off."
  },
  {
    productimage:laptopstandImage,
    id: uuid(),
    productname: "Laptop Stand",
    productprice: "$29.99",
    productdescription: "Adjustable aluminum laptop stand for desk ergonomics."
  },
  {
    productimage:backpackImage,
    id: uuid(),
    productname: "Backpack",
    productprice: "$49.99",
    productdescription: "Water-resistant travel backpack with multiple compartments and USB charging port."
  },
  {
    productimage:yogamatImage,
    id: uuid(),
    productname: "Yoga Mat",
    productprice: "$24.99",
    productdescription: "Eco-friendly non-slip yoga mat with carrying strap."
  },
  {
    productimage:deskImage,
    id: uuid(),
    productname: "Desk Lamp",
    productprice: "$19.99",
    productdescription: "LED desk lamp with touch control, dimmable brightness, and USB charging port."
  },
  {
    productimage:gamingchairImage,
    id: uuid(),
    productname: "Gaming Chair",
    productprice: "$199.99",
    productdescription: "Ergonomic gaming chair with lumbar support and adjustable armrests."
  },
  {
    productimage:wirelesschargerImage,
    id: uuid(),
    productname: "Wireless Charger",
    productprice: "$18.99",
    productdescription: "Fast wireless charging pad compatible with all Qi-enabled devices."
  },
  {
    productimage:noisemachineImage,
    id: uuid(),
    productname: "Noise Machine",
    productprice: "$29.99",
    productdescription: "White noise sound machine with timer and multiple soothing sound options."
  }
];

export default productDetails;
