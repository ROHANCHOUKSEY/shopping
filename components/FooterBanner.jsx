import React from 'react'
import Link from 'next/link';
import product from '@/sanity/schemas/product';


const FooterBanner = ({props:banners}) => {
  

  let nk =  "";
  nk = banners[0].image?.asset?._ref;
  let temp2 = "-webp";
  let temp = "image-"
  const news = nk? nk.replace(temp,""):"";
  const news2 = news? news.replace(temp2,".webp"):"";
  let image = "https:cdn.sanity.io/images/zkvrb2sz/production/" + news2 + "?w=2000&fit=max&auto=format&dpr=2";


  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'> 
          <p>{banners[0].discount}</p>
          <h3>{banners[0].largeText1}</h3>
          <h3>{banners[0].largeText2}</h3>
          <p>{banners[0].saleTime}</p>
        </div>  
        <div className='right'>
          <p>{banners[0].smallText}</p>
          <h3>{banners[0].midText}</h3>
          <p>{banners[0].desc}</p>
          <Link href={`/product${product}`}>
           <button type='button'>{banners[0].buttonText}</button>
          </Link>
        </div>
        <img  src={image} className='footer-banner-image'/>
      </div>
    </div>
  )
}

export default FooterBanner