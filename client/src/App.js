import { createContext, useState } from 'react';
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { DirectRoutes } from './Components/Navbar/Routes';

export const Info = createContext();


function App() {
  const [userCart, setUserCart] = useState([]);
  const [totalAmu,setTotal]=useState(0);
  const addItems = (item) => {
    console.log("hererererer")
    setUserCart([...userCart,item])
  }
  const removeItm=(idIs)=>{
    setUserCart(userCart.filter(el=>el.id!==idIs))
  }
  const totalIs=(price)=>{
    console.log("here price is",price)
    setTotal(price)
  }
  return (
    <div className="">
      <Navbar />
      <Info.Provider value={{totalAmu,userCart,addItems,removeItm,totalIs}}>
        <DirectRoutes />
      </Info.Provider>
    </div>
  );
}

export default App;
