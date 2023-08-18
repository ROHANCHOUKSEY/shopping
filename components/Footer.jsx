import React from 'react'
import { AiFillInstagram,  AiFillAmazonSquare, AiFillApple, AiFillFacebook } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2023 Fill Your Music reserved</p>
      <p className='icons'>
        <AiFillFacebook/>
        <AiFillInstagram/>
        <AiFillAmazonSquare/>
        <AiFillApple/>
      </p>
    </div>
  )
}

export default Footer