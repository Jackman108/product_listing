import React from 'react';
import useProducts from '../../hooks/useProducts';
import Product from '../Product/Product';
import ProductFilters from '../ProductFilters/ProductFilters';
import styles from './ProductList.module.css';

const ProductList = () => {
  const { products, nameFilter, priceFilter, brandFilter,
    handleNameFilterChange, handlePriceFilterChange, handleBrandFilterChange,
    brandOptions, handlePageChange, loadedProductsCount, loadNextProducts,totalPages, page } = useProducts();

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
        <button onClick={() => handlePageChange('prev')} disabled={loadedProductsCount === 0}>
          Previous Page
        </button>
        <button onClick={() => {
          handlePageChange(page + 1);
          loadNextProducts(); 
        }} disabled={page === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default ProductList;
