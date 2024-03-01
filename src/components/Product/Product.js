// Product.js
import React from 'react';
import styles from './Product.module.css';

const Product = ({ product }) => {
  return (
    <li className={styles['product-item']}>
      <div>ID: {product.id}</div>
      <div>Name: {product.product}</div>
      <div>Price: {product.price}</div>
      <div>Brand: {product.brand}</div>
    </li>
  );
};

export default Product;
