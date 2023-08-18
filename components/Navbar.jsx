"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion'; // You may need to install framer-motion library.
import { Cart } from './';
import { setGlobalState, useGlobalState } from '../context/state';



const Navbar = () => {
  
  let [totalQuantities] = useGlobalState("totalQuantities");  
  const [showCart, setShowCart] = useState(false);

  const handleLogoClick = () => {
    setShowCart(true);
  };

  return (
    <div className='navbar-container'>
      <motion.p className='logo' onClick={handleLogoClick}>
        <Link href='/'>AudioHaven Hub</Link>
      </motion.p>

      <button type='button' className='cart-icon' onClick={() => setShowCart(!showCart)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      <AnimatePresence>
        {showCart && <Cart setShowCart={setShowCart} />}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
