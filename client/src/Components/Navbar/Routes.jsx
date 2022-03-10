import { Route, Routes } from "react-router-dom";
import { Home } from "../Home";
import { Cart } from "../Cart/Cart";
import { SelShop } from "../SelShop/SelShop";
import { Checkout } from "../Checkout/Checkout";

export const DirectRoutes=()=>{
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="sel/:id" element={<SelShop />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
    )
}