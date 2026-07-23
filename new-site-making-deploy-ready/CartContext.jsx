import {createContext, useState,useContext} from "react";
const CartContext = createContext();

export function CartProvider({children}){
    const [cart,setCart] = useState([]);
    function addToCart(item){
        setCart(prev => {
            const existing = prev.find(i => i.name === item.name);
            if (existing) {
                return prev.map(i => 
                    i.name === item.name 
                    ? { ...i, quantity: i.quantity + 1 } 
                    : i
                );
            } else {
                return [...prev, { ...item, quantity: 1 }];
            }
        });

    }


    function updateQuantity(itemName, amount) {
        setCart(prev => prev
            .map(i => i.name === itemName 
                ? { ...i, quantity: i.quantity + amount } 
                : i
            )
            .filter(i => i.quantity > 0) 
        );
    }

    function RemoveFromCart(itemName) {
        setCart(prev => prev.filter(i => i.name !== itemName));
    }
    return(
        <CartContext.Provider value={{cart,addToCart,RemoveFromCart,updateQuantity}}>
            {children}
        </CartContext.Provider>
    );
}
export function useCart(){
    return useContext(CartContext);
}