import React,{useState,useMemo} from "react";
import ReactDOM from "react-dom";
import {Women_page,cart} from "./utilis";
import { useCart } from "./CartContext";


export default function Women(){
    const {addToCart,updateQuantity} = useCart();
    const [sortOrder,setsort] = useState("default");
    const parseprice = (parsestr)=>{
        return parseFloat(parsestr.replace(/[^0-9.]/g,""));

    }
    const sortedProducts = useMemo(() => {
        const products = [...Women_page];
            if (sortOrder === "Low-To-High") {
            products.sort((a, b) => parseprice(a.price) - parseprice(b.price));
            } else if (sortOrder === "High-To-Low") {
            products.sort((a, b) => parseprice(b.price) - parseprice(a.price));
            }
            
            return products;
    }, [sortOrder]);

    return(
        <div className="women_page">
            <div className="sorting">
                <label>Sort by Price : </label>
                <select value={sortOrder} onChange={(e)=>setsort(e.target.value)}>
                    <option value="default">Default</option>
                    <option value="Low-To-High">Low To High</option>
                    <option value="High-To-Low">High To Low</option>

                </select>
            </div>
        <div className="women_card_grid">
            {
                Women_page.map((item) => {
                    return(
                        <div className="women_card" key={item.name}>
                            <img src={item.link} alt={item.name} className="women_card_image"/>
                            <div className="women_card_content">
                                <p className="women_card_price">{item.price}</p>
                                <p className="women_card_fake_price">{item.fake_price}</p>
                                <button className="women_card_button" onClick={() => addToCart(item)}>Add to Cart</button>
                            </div>
                        </div>
                    )
                })




            }       


        </div>
        </div>
    )

}