import React from 'react';
import Link from 'next/link';
// import {urlForImage} from '../sanity/lib/image';


const HeroBanner = ({props}) => { 
  let nk =  "";
  nk = props[0].image?.asset?._ref;
  let temp2 = "-webp";
  let temp = "image-"
  const news = nk? nk.replace(temp,""):"";
  const news2 = news? news.replace(temp2,".webp"):"";
  let image = "https:cdn.sanity.io/images/zkvrb2sz/production/" + news2 + "?w=2000&fit=max&auto=format&dpr=2";
  console.log(image);
  // console.log("Nikhil", props[0].image.asset._ref)
  // https:cdn.sanity.io/images/zkvrb2sz/production/a64b345016e96adfb8849af5521c8e0ecfe8f027-555x555.webp?w=2000&fit=max&auto=format&dpr=2
  return(
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{props[0].smallText}</p>
        <h3>{props[0].midText}</h3>
        <h1>{props[0].largeText1}</h1>
        <img src={image} alt="headphones" className="hero-banner-image"/>  
        <div>
          <Link href="/product/ID">
              <button type="button">{props[0].buttonText}</button>
          </Link>
          <div className="desc">
            <h5>{props[0].desc}</h5>
            <p>{props[0].desc}</p>
          </div>
        </div>
      </div> 
    </div>
  )
} 
 
export default HeroBanner;