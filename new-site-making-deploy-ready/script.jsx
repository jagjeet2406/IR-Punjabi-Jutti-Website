import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Head from "./head";
import Card from "./Card";
import Men from "./men";
import Women from "./women";
import Kid from "./kid";
import Gabru from "./little_gabru";
import Mutiyar from "./little_mutiyar";
import Wedding from "./wedding";
import Groom from "./groom_collection";
import Bride from "./bride_collection";
import Handbag from "./Handbag"
import Footer from "./footer";
import {arr} from "./utilis";
import { cart } from "./utilis";
import { CartProvider } from "./CartContext";
import Cart from "./cart"
import return_and_exchange from "./Return and exchange";



function App(){
    return(
        <CartProvider>
        <>
        <a href="https://wa.me/+918872221205?text=" target="_blank">
            <img className="contact" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV0QiU30wRrmwBKWXcXIlNuileOBuF9WGEPvqIEit2BANTgLH0HTAy0Tgb&s=10"/>
        </a>
        <a href="/">
            <img className="home" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU4AHHo9Nwd0nLuJXLXYTo1Km8RGjg17WyV749Y-hXpQ&s=10"/>
        </a>
            
        
        <BrowserRouter>
        <Head></Head> 
        <nav className="head2">
            <Link to="/men-collection">Men</Link>
            <Link to="/women-collection">Women</Link>
            <Link to="/kid-collection">Kids</Link>
            <Link to="/wedding-collection">Wedding</Link>
        </nav>
            <Routes>
                <Route path="/" element={<Card/>}></Route>
                <Route path="/men-collection" element={<Men/>}></Route>
                <Route path="/women-collection" element={<Women/>}></Route>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/kid-collection" element={<Kid/>}>
                    <Route index element={<Gabru />} />
                    <Route path="Gabru-collection" element={<Gabru/>}></Route>
                    <Route path="Mutiyar-collection" element={<Mutiyar/>}></Route>
                </Route>
                
                <Route path="/wedding-collection" element={<Wedding/>}>
                    <Route index element={<Groom/>} />
                    <Route path="Groom-collection" element={<Groom/>}></Route>
                    <Route path="Bride-collection" element={<Bride/>}></Route></Route>
                <Route path="/purse-collection" element={<Handbag/>}></Route>
            </Routes>
        </BrowserRouter>
        <Footer></Footer>
        </>
        </CartProvider>

    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App></App>);

