// ProductList.js

import React, { useEffect } from 'react';
import useProducts from '../../hooks/useProducts';
import Product from '../Product/Product';
import ProductFilters from '../ProductFilters/ProductFilters';
import styles from './ProductList.module.css';

const ProductList = () => {
  const {
    products,
    nameFilter,
    priceFilter,
    brandFilter,
    brandOptions,
    totalPages,
    page,
    handleNameFilterChange,
    handlePriceFilterChange,
    handleBrandFilterChange,
    handlePageChange,
  } = useProducts();
  useEffect(() => {
    console.log("Products:", products);
    console.log("Total Pages:", totalPages);
    console.log("Page:", page);
  }, [products, totalPages, page]);
  return (
    <div className={styles['product-list-container']}>
      <h1 className={styles['product-list-title']}>Products</h1>
      <ProductFilters
        nameFilter={nameFilter}
        priceFilter={priceFilter}
        brandFilter={brandFilter}
        handleNameFilterChange={handleNameFilterChange}
        handlePriceFilterChange={handlePriceFilterChange}
        handleBrandFilterChange={handleBrandFilterChange}
        brandOptions={brandOptions}
      />
      {products.data.length > 0 ? (
        <ul className={styles['product-list']}>
          {products.data.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
      <div className={styles['product-list-buttons']}>
        <button onClick={() =>
          handlePageChange(page - 1)
        } disabled={page === 1 }>
          Previous Page
        </button>
        <span>{`Page ${page}`}</span>
        <button onClick={() =>
          handlePageChange(page + 1)
        } disabled={page === totalPages || products.data.length <= 50}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default ProductList;
