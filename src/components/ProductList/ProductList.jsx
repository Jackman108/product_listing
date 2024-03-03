// ProductList.js

import React from 'react';
import useProducts from '../../hooks/useProducts';
import Product from '../Product/Product';
import ProductFilters from '../ProductFilters/ProductFilters';
import styles from './ProductList.module.css';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

const ProductList = () => {
  const {
    products,
    nameFilter,
    priceFilter,
    brandFilter,
    brandOptions,
    totalPages,
    page,
    loading,
    handleNameFilterChange,
    handlePriceFilterChange,
    handleBrandFilterChange,
    handlePageChange,
  } = useProducts();

  return (
    <div className={styles['product-list-container']}>
      <h1 className={styles['product-list-title']}>Jewelry products
      </h1>
      <ProductFilters
        nameFilter={nameFilter}
        priceFilter={priceFilter}
        brandFilter={brandFilter}
        handleNameFilterChange={handleNameFilterChange}
        handlePriceFilterChange={handlePriceFilterChange}
        handleBrandFilterChange={handleBrandFilterChange}
        brandOptions={brandOptions}
      />
      {loading ? ( // Conditionally render loading animation
        <LoadingAnimation />
      ) : (
        <>
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
            } disabled={page === 1}>
              Previous Page
            </button>
            <span className={styles['page-indicator']}>{`Page ${page}`}</span>
            <button onClick={() =>
              handlePageChange(page + 1)
            } disabled={page === totalPages}>
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
