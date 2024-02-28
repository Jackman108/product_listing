import React, { useState, useEffect } from 'react';
import { fetchProducts, applyFilters, fetchItems } from '../api.js';

const ProductList = () => {
    const [products, setProducts] = useState({ data: [], totalCount: 0 });
    const [page, setPage] = useState(1);
    const [nameFilter, setNameFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
  
    useEffect(() => {
        const loadProducts = async () => {
          try {
            const { data: productIds, totalCount } = await fetchProducts(page);
            const filteredProductIds = await applyFilters(nameFilter, priceFilter, brandFilter);
            const uniqueFilteredProductIds = [...new Set(filteredProductIds)];
            const productsData = await fetchItems(uniqueFilteredProductIds.slice(0, 50));
            setProducts({ data: productsData, totalCount });
          } catch (error) {
            console.error('Error loading products:', error);
          }
        };
      
        loadProducts();
      }, [page, nameFilter, priceFilter, brandFilter]);
  
    const handleNameFilterChange = (event) => {
      setNameFilter(event.target.value);
      setPage(1);
    };
  
    const handlePriceFilterChange = (event) => {
      setPriceFilter(event.target.value);
      setPage(1);
    };
  
    const handleBrandFilterChange = (event) => {
      setBrandFilter(event.target.value);
      setPage(1);
    };
  
    const handlePageChange = (pageNumber) => {
      setPage(pageNumber);
    };
  
    return (
      <div>
        <h1>Products</h1>
        <div>
          <input type="text" placeholder="Filter by name" value={nameFilter} onChange={handleNameFilterChange} />
          <input type="text" placeholder="Filter by price" value={priceFilter} onChange={handlePriceFilterChange} />
          <input type="text" placeholder="Filter by brand" value={brandFilter} onChange={handleBrandFilterChange} />
        </div>
        <ul>
          {products.data.map((product, index) => (
            <li key={index}>
              <div>Number: {index + 1}</div>
              <div>ID: {product.id}</div>
              <div>Name: {product.product}</div>
              <div>Price: {product.price}</div>
              <div>Brand: {product.brand}</div>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Previous Page
          </button>
          <button onClick={() => handlePageChange(page + 1)} disabled={page * 50 >= products.totalCount}>
            Next Page
          </button>
        </div>
      </div>
    );
  };
  

export default ProductList;
