"use client"
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../../sanity/lib/client';
import './blogPost.css';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar, AiFillInstagram,  AiFillAmazonSquare, AiFillApple, AiFillFacebook  } from 'react-icons/ai';
import {useStateContext } from '../../../context/StateContext';
import Navbar from '../../../components/Navbar';
import Product from '../../../components/Product';
import { setGlobalState, useGlobalState } from '../../../context/state';
import { Toaster, toast } from 'react-hot-toast';




export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  let [totalQuantities] = useGlobalState("totalQuantities");
  let [cartItems] = useGlobalState("cartItems");
  let[totalPrice] = useGlobalState("totalPrice")


  const AddToCart = () => {
  // setGlobalState("totalQuantities", quantity);
  // const checkProductInCart = cartItems.find((item) => item._id === blogPost[0]._id);
  
  // if (checkProductInCart) {
  //   const updatedCartItems = cartItems.map((cartProduct) =>
  //     cartProduct._id === blogPost[0]._id? { ...cartProduct, quantity: cartProduct.quantity + quantity } : cartProduct
  //   );

  //   setGlobalState(updatedCartItems);
  // } else {
  //   setGlobalState([...cartItems, { ...blogPost[0], quantity }]);
  // }
  // cartItems.map(isPresent)
  // function isPresent(val){
    
  //   if(blogPost[0]._id == val._id)
  //   {
  //     setGlobalState("cartItems", [...cartItems, { ...blogPost[0],}]);
  //   }
  
  // }

  const index = cartItems.findIndex(item => item._id === blogPost[0]._id);
  if (index !== -1) {
    // Product exists in cartItems, increase the quantity
    cartItems[index].quantity += quantity;
  } else {
    // Product doesn't exist in cartItems, add it with quantity 1
    cartItems.push({ ...blogPost[0] , quantity: quantity });
  }

  setGlobalState("cartItems", cartItems);

  // setGlobalState("cartItems", [...cartItems, { ...blogPost[0], quantity }]);
  const updatedTotalPrice = totalPrice + blogPost[0].price * quantity;
  setGlobalState("totalPrice", updatedTotalPrice);
  setGlobalState("totalPrice", totalPrice + blogPost[0].price * quantity)
  setGlobalState("totalQuantities", totalQuantities + quantity)
  console.log(cartItems);
  toast.success(`${quantity} ${blogPost[0].name} added to the cart.`);
};

  // Loading state
  const [loading, setLoading] = useState(true);
  const [blogPost, setBlogPost] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }

    if(quantity - 1 < 1) return 1;
  };


  
  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const query = `*[_type == "product"]`;
        const newProducts = await client.fetch(query);
        const filteredData = newProducts.filter((item) => item.slug.current === slug);
        const temp = newProducts.filter(product => product.slug.current !== slug);
        setBlogPost(filteredData);
        setAllProducts(temp);
      } catch (error) {
        console.error('Error fetching data:', error); 
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  // Render loading state or blog post content
  if (loading) {
    return <div>Loading...</div>;
  }

  function urlfromimage(params){
  let nk = params;
  // nk = blogPost?blogPost[0]?.image[index]?.asset?._ref:"";
  let temp2 = '-webp';
  let temp = 'image-';
  const news = nk ? nk.replace(temp, '') : '';
  const news2 = news ? news.replace(temp2, '.webp') : '';
  const image = `https://cdn.sanity.io/images/zkvrb2sz/production/${news2}?w=2000&fit=max&auto=format&dpr=2`;
  return image;
  } 

  let nk = '';
  nk = blogPost?blogPost[0]?.image[index]?.asset?._ref:"";
  let temp2 = '-webp';
  let temp = 'image-';
  const news = nk ? nk.replace(temp, '') : '';
  const news2 = news ? news.replace(temp2, '.webp') : '';
  const image = `https://cdn.sanity.io/images/zkvrb2sz/production/${news2}?w=2000&fit=max&auto=format&dpr=2`;
  // console.log(Product);
  return (
    <div>
      {/* Render the blog post using the fetched data */}
      {blogPost ? (
        <div>
          <Navbar/>
          <div className='product-detail-container'>
            <div>
              <div className='image-container'>
                <img src={image} className='product-detail-image'/>
              </div>
              <div className='small-images-container'>
                {/* Mapping through blogPost[0]?.image */}
                {blogPost[0]?.image?.map((item, i) => (
                  <img src={urlfromimage(item?.asset?._ref)} key={i} className={i === index ? 'small-image selected-image' : 'small-image'} onMouseEnter={() => setIndex(i)}/>
                ))}
              </div>
            </div>
            <div className='product-detail-desc'>
                <h1>{blogPost[0].name}</h1>
                <div className='reviews'>
                  <div>
                    <AiFillStar/>  
                    <AiFillStar/>  
                    <AiFillStar/>  
                    <AiFillStar/>  
                    <AiOutlineStar/>
                  </div>
                  <p>
                    (20)
                  </p>
                </div>
                <h4>Details: </h4>
                <p>{blogPost[0].details}</p>
                <p className='price'>₹{blogPost[0].price}</p>
                <div className='quantity'>
                    <h3>Quantity: </h3>
                    <p className='quantity-desc'>
                    <span className='minus' onClick={decrementQuantity} >
                          <AiOutlineMinus />
                    </span>
                        <span className='num'>{quantity}</span>
                        <span className='plus' onClick={ incrementQuantity }>
                            <AiOutlinePlus />
                        </span>
                    </p>
                </div>
                <div className='buttons'>
                  <button type='button' className='add-to-cart' onClick={AddToCart}>Add to Cart</button>
                  <button type='button' className='buy-now' onClick="">Buy Now</button>
                </div>
            </div>
          </div>
              <div className='maylike-products-wrapper'> 
                  <h2>You may also like</h2>
                  <div className='marquee'>
                  <div className='maylike-products-container track'>
                    {allProducts.map((item) => (
                      <Product props={item}/>
                    ))}
                  </div> 
              </div>
            </div>
          <div className='footer-container'>
      <p>2023 Fill Your Music reserved</p>
      <p className='icons'>
        <AiFillFacebook/>
        <AiFillInstagram/>
        <AiFillAmazonSquare/>
        <AiFillApple/>
      </p>
    </div>
        </div>
      ) : (
        <div>Blog post not found.</div>

      )}

    </div>
  );
}


// export default productDetails;




































































































// import { useRouter } from 'next/router';
// import { client } from '../../../sanity/lib/client';

// const productDetails = () => {

//   const [newSlug, setnewSlug] = useState();

//   const router = useRouter();
//   const { slug } = router.query;



//   const [products, setProducts] = useState({ name: 'nikhil'});

//   useEffect(() => {
//     setnewSlug(router.query?router.query:"magic");
//     console.log(newSlug);
//     async function getProducts() {
//       // const query = '*[_type == "product"]';
//       // while(!slug)
//       // {
//          // console.log("rohan");
//       // }
//       const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
//       const newProducts = await client.fetch(query);
//       console.log(newProducts);
//       const filteredData = newProducts.filter(item => item.slug.current === slug);
//       console.log("filterdata: ", filteredData);
//       setProducts(filteredData);
//       console.log(slug);
//     }

//     getProducts();
//   }, []);


//   let nk = '';
//   nk = products.image?.asset?._ref;
//   let temp2 = '-webp';
//   let temp = 'image-';
//   const news = nk ? nk.replace(temp, '') : '';
//   const news2 = news ? news.replace(temp2, '.webp') : '';
//   const image = `https://cdn.sanity.io/images/zkvrb2sz/production/${news2}?w=2000&fit=max&auto=format&dpr=2`;



//   console.log(image);
  
//   return (
//     <div>
//       <div className='product-details-container'>
//         <div>
//           <div className='image-container'>
//             <img src={image} alt={products.name} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const getStaticPaths = async () => {
//   const query = `*[_type == "product"] {
//     slug {
//       current
//     }
//   }`;

//   const products = await client.fetch(query);

//   const paths = products.map((product) => ({
//     params: {
//       slug: product.slug.current,
//     },
//   }));

//   return {
//     paths,
//     fallback: 'blocking',
//   };
// };

// export const getStaticProps = async ({ params: { slug } }) => {
//   const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
//   const productsQuery = '*[_type == "product"]';

//   const product = await client.fetch(query);
//   const products = await client.fetch(productsQuery);

//   return {
//     props: { products, product },
//   };
// };

// export default productDetails;





// import React from 'react'

// import { useRouter } from 'next/router';

// export function BlogPost() {
//   const router = useRouter();
//   const { slug } = router.query;
  
//   console.log(slug);
//   return (
//     <div> </div>
//   )
// }

// export default BlogPost
