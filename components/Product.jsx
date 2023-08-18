import React from 'react';
import Link from 'next/link';

import { urlForImage } from '@/sanity/lib/image';

 
const Product = ({props}) => {

  let nk =  "";
  nk = props.image? props.image[0]?.asset?._ref:"";
  let temp2 = "-webp";
  let temp = "image-"
  const news = nk? nk.replace(temp,""):"";
  const news2 = news? news.replace(temp2,".webp"):"";
  let image = "https:cdn.sanity.io/images/zkvrb2sz/production/" + news2 + "?w=2000&fit=max&auto=format&dpr=2";

  return (
    <div> 
      <Link href={`/product/${props.slug?.current}`}>
        <div className='product-card'> 
            <img  
            src = {image}
            // src={urlForImage(props.image && props.image[0])}
            width={250}
            height={250}
            className='product-image'
            />
            <p className='product-name'>{props.name}</p>
            <p className='product-proce'>₹{props.price}</p>
        </div>
      </Link>
    </div>
  )
} 

export default Product