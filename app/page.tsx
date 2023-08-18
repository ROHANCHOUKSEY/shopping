"use client";
import React, { useState, useEffect } from 'react';
import { client } from '../sanity/lib/client';
import { FooterBanner, HeroBanner, Product } from '../components';
import banner from '@/sanity/schemas/banner';
// import Product from '@/sanity/schemas/product';

const Home = () => {
  const [products, setProducts] = useState([{ name: 'nikhil'}]);
  const [banners, setBanners] = useState([{ name: 'nikhil' }]);
  const [footer, setFooterBanner] = useState([{name: 'nikhil'}]);

  useEffect(() => {
    async function getProducts() {
      
      const query = '*[_type == "product"]';
      const newProducts = await client.fetch(query);
 
      const bannerQuery = '*[_type == "banner"]';
      const bannerData = await client.fetch(bannerQuery); 

      const FooterBanner = '*[_type == "footer"]';
      const footer = await client.fetch(bannerQuery);

      // console.log(bannerData);
      setProducts(newProducts);
      setBanners(bannerData);
      setFooterBanner(bannerData);
    }

    getProducts();
  }, []);

  return (
    <div>
      <HeroBanner props = {banners}/>
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>There are many variations passages</p>
      </div>

    
      <div className="products-container">
        {products?.map((product) => <Product props={product} />)}
      </div>

      <FooterBanner props={banners}/>
    </div>
  );
};

// export const getServerSideProps = async () => {
//   const query = '*[_type == "product"]';
//   const products = await client.fetch(query);

//   const bannerQuery = '*[_type == "banner"]';
//   const bannerData = await client.fetch(bannerQuery);

//   return {
//     props: { products, bannerData },
//   };
// };

export default Home;