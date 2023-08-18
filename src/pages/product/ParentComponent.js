import React from 'react';
import BlogPost from '../../../src/pages/product/[slug]';
import { StateContext } from '../../../context/StateContext';

export default function ParentComponent() {
    // Get the incQty, decQty, and qty from the StateContext
    const { incQty, decQty, qty } = useStateContext();
  
    // ... (other logic)
  
    return ( 
      // ... (other JSX)
  
      <BlogPost incQty={incQty} decQty={decQty} qty={qty} />
  
      // ... (other JSX)
    );
  }