"use client"
import React, {useState} from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineRight, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../sanity/lib/client';
import { setGlobalState, useGlobalState} from '../context/state';
import './cart.css';

const Cart = ({ setShowCart, blogPost }) => {
  const { increaseQuantity, decreaseQuantity} = useStateContext();
  let [totalQuantities] = useGlobalState("totalQuantities");
  let [cartItems] = useGlobalState("cartItems");
  let [totalPrice] = useGlobalState("totalPrice");
  const [quantity, setquantity] = useState(0);
  
  console.log("cartItems:", cartItems);
  console.log("totalPrice:", totalPrice);


  function urlfromimage(props){
    let nk =  "";
    nk = props.image? props.image[0]?.asset?._ref:"";
    let temp2 = '-webp';
    let temp = 'image-';
    const news = nk ? nk.replace(temp, '') : '';
    const news2 = news ? news.replace(temp2, '.webp') : '';
    const image = `https://cdn.sanity.io/images/zkvrb2sz/production/${news2}?w=2000&fit=max&auto=format&dpr=2`;
    return image;
  }

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const removeFromCart = (productId) => {
    // Identify the index of the product in the cartItems array
    const index = cartItems.findIndex(item => item._id === productId);

    if (index !== -1) {
      // Remove the product from the cartItems array
      const updatedCartItems = cartItems.filter(item => item._id !== productId);
      setGlobalState("cartItems", updatedCartItems);

      // Update total quantities and total price
      const removedItem = cartItems[index];
      setGlobalState("totalQuantities", totalQuantities - removedItem.quantity);
      const updatedTotalPrice = totalPrice - (removedItem.price * removedItem.quantity);
      setGlobalState("totalPrice", updatedTotalPrice);

      toast.success(`${removedItem.quantity} ${removedItem.name} removed from the cart.`);
    }
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };


 
  const plus = (val) => {
    const index = cartItems.findIndex(item => item._id === val._id);
    cartItems[index].quantity++;
    setquantity(quantity + 1);

    // Update total quantities
    setGlobalState("totalQuantities", totalQuantities + 1);

    const updatedTotalPrice = totalPrice + val.price;
    setGlobalState("totalPrice", updatedTotalPrice);
  }


  const minus = (val) => {
    const index = cartItems.findIndex(item => item._id === val._id);

    if (cartItems[index].quantity > 0) {
      cartItems[index].quantity--;
      setquantity(quantity - 1);

      // Update total quantities
      setGlobalState("totalQuantities", totalQuantities - 1);

      const updatedTotalPrice = totalPrice - val.price;
      setGlobalState("totalPrice", updatedTotalPrice);
    }
  }

  return (
    <div className='cart-wrapper'>
      <div className='cart-container'>
        <button type='button' className='cart-heading' onClick={handleCloseCart}>
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your Shopping bag is empty</h3>
            <Link href='/'>
              <button type='button' onClick={handleCloseCart} className='btn'>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

          <div className='product-container'>
            {cartItems.length >= 1 && cartItems.map((item) => (
              <div className='product' ket={item._id}>
                <img src={urlfromimage(item)} className='cart-product-image'/>
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>₹{item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                    <div className='quantity'>Quantity : </div>
                    <p className='quantity-desc'>
                    <span className='minus' onClick={() => minus(item)} >
                      <p className='hide'>
                        {quantity}
                      </p>
                          <AiOutlineMinus />
                    </span>
                        <span className='num'>{item.quantity}</span>
                        <span className='plus' onClick={() => plus(item)}>
                            <AiOutlinePlus />
                        </span>
                    </p>  
                    </div>  
                    <button type='button' className='remove-item' onClick={() => handleRemove(item._id)}>
                        <TiDeleteOutline/>
                    </button>
                  </div>
                  </div>
              </div>
            ))}

          </div>
          
          {cartItems.length >= 1 && (
            <div className='cart-bottom'>
              <div className='total'>
                <h3>Subtotal:</h3>
                <h3>₹{totalPrice}</h3>
              </div>
            </div>
          )}
        
      </div>
    </div>
  );
};

export default Cart;
