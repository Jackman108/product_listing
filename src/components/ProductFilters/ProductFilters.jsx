// ProductFilters.js
import React from 'react';
import styles from './ProductFilters.module.css';

const ProductFilters = ({ nameFilter, priceFilter, brandFilter, handleNameFilterChange, handlePriceFilterChange, handleBrandFilterChange, brandOptions }) => {
  return (
    <div className={styles['product-filters-container']}>
      <input type="text" placeholder="Filter by name" value={nameFilter} onChange={handleNameFilterChange} />
      <input type="number" placeholder="Filter by price" value={priceFilter} onChange={handlePriceFilterChange} />
      <select value={brandFilter} onChange={handleBrandFilterChange}>
        <option value="">Filter by brand</option>
        {Array.isArray(brandOptions) && brandOptions.map((brand, index) => (
          <option key={index} value={brand}>{brand}</option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilters;
