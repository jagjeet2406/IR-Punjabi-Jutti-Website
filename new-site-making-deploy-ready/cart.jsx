import React , { useState } from "react";
import { useCart } from "./CartContext";





export default function Cart(){
     const getPrice = (str) => Number(str.replace("₹","").replace(",",""));
    
    const {cart,RemoveFromCart,updateQuantity} = useCart();
    const [discount_coupon, setDiscount_coupon] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponMsg, setCouponMsg] = useState("");
            
        const totalMRP = cart.reduce((sum, item) => 
            sum + getPrice(item.fake_price) * item.quantity, 0
        );
        const basePayable = cart.reduce((sum, item) => 
            sum + getPrice(item.price) * item.quantity, 0
        );
        const totalSavings = totalMRP - basePayable;
        const totalPayable = couponApplied 
        ? Math.round(basePayable * 0.9)   
        : basePayable;
        function valid_discount() {
        if(discount_coupon === "FIRST100") {
            setCouponApplied(true);
            setCouponMsg("Coupon applied! 10% discount added.");
        } else {
            setCouponApplied(false);
            setCouponMsg("Invalid coupon code.");
        }
    }




    return(
        <>
        <div className="cart_len">
            {
            cart.map((item) => {
                return(
                    <div className="women_card" key={item.name}>
                        <img className="delete" onClick={()=> RemoveFromCart(item.name)} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-osDM4u7-sL9Qs4ruOp6Armi95VbKh58pPCOfSeqgGA&s=10"/>
                        <img src={item.link} alt={item.name} className="women_card_image"/>
                        <div className="cart_item_content">
                            <p className="original_price">original price : {item.fake_price}</p>
                            
                            <p className="discount">You Save : ₹{Number(item.fake_price.replace("₹","")) -Number(item.price.replace("₹",""))}</p>
                            <p className="cart_item_price"> Total price :  {item.price}</p>
                            <p className="update_cart">
                                quantity: {item.quantity}
                                <button onClick={()=> updateQuantity(item.name,-1)}>-</button>
                                <button onClick={()=> updateQuantity(item.name,+1)}>+</button>
                            </p>
                           
                        </div>
                        
                    </div>
                )
            })}
            {cart.length === 0 && <p>Your Cart is Empty</p>}




            

        </div>

        <div className="bill_summary">
            <h3>-------------------------Bill Summary--------------------------------</h3>
            <div className="row">
                <div className="bill_row">
                    <span>Total MRP : </span>
                    <span>₹{totalMRP}</span>
                </div>
                <div className="bill_row">
                    <span>Total Discount  </span>
                    <span style={{color: "green"}}>- ₹{totalSavings}</span>
                </div>
                <div className="or_discount">
                    <label>COUPON CODE : </label>
                    <input placeholder="Enter Coupon Code" value={discount_coupon} onChange={(e) => setDiscount_coupon(e.target.value)}></input>
                    <button onClick={()=> valid_discount()}>Apply</button>
                    {couponMsg && (
                            <p style={{color: couponApplied ? "green" : "red"}}>
                                {couponMsg}
                            </p>
                    )}
                </div>

                <div className="bill_row total">
                    <strong>Total Payable  </strong>
                    <strong>₹{totalPayable}</strong>
                </div>
                {/* onClick={handlePayment} */}
                <button className="checkout_btn" >
                    Proceed to Pay ₹  {totalPayable}
                </button>
            </div>

        </div>
</>
    )
}