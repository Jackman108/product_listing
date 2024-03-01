import { useState, useEffect } from 'react';
import { removeDuplicateProducts } from '../helpers/removeDuplicateProducts';
import {
    fetchProducts,
    fetchItems,
    fetchFields,
    filterProductsByName,
    filterProductsByPrice,
    filterProductsByBrand
} from '../api/products';


const useProducts = () => {
    const [products, setProducts] = useState({ data: [], totalCount: 0 });
    const [page, setPage] = useState(1);
    const [nameFilter, setNameFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [brandOptions, setBrandOptions] = useState([]);
    const [loadedProductsCount, setLoadedProductsCount] = useState(0);
    const totalPages = Math.ceil(products.totalCount / 50);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const { data: productIds, totalCount } = await fetchProducts(page);
                if (!productIds) {
                    setProducts({ data: [], totalCount: 0 });
                    return;
                }
                
                let filteredProductIds = removeDuplicateProducts(productIds);

                if (nameFilter) {
                    const filteredByName = await filterProductsByName(nameFilter);
                    filteredProductIds = filteredProductIds.filter(id => filteredByName.data.includes(id));
                }

                if (priceFilter) {
                    const filteredByPrice = await filterProductsByPrice(priceFilter);
                    filteredProductIds = filteredProductIds.filter(id => filteredByPrice.data.includes(id));
                }

                if (brandFilter) {
                    const filteredByBrand = await filterProductsByBrand(brandFilter);
                    filteredProductIds = filteredProductIds.filter(id => filteredByBrand.data.includes(id));
                }

                setProducts(prevState => ({
                    ...prevState,
                    totalCount: filteredProductIds.length
                }));

                const startIndex = (page - 1) * 50;
                const endIndex = Math.min(startIndex + 50, filteredProductIds.length);
                const pageFilteredProductIds = filteredProductIds.slice(startIndex, endIndex);

                const productsData = await fetchItems(pageFilteredProductIds);

                setProducts({ data: productsData.data, totalCount });

                setLoadedProductsCount(pageFilteredProductIds.length);

            } catch (error) {
                console.error('Error loading products:', error);
                if (error.response && error.response.status === 500) {
                    console.error('Authorization error, retrying...');
                    setTimeout(loadProducts, 1000);
                    return;
                }
            }
        };
        loadProducts();
    }, [page, nameFilter, priceFilter, brandFilter]);

    useEffect(() => {
        const loadBrandOptions = async () => {
            try {
                const options = await fetchFields('brand');
                setBrandOptions(options.data);
            } catch (error) {
                console.error('Error loading brand options:', error);
            }
        };
        loadBrandOptions();
    }, []);

    const updateTotalCount = async () => {
        try {
            let filteredProductIds = [];

            if (nameFilter) {
                const filteredByName = await filterProductsByName(nameFilter);
                filteredProductIds = filteredByName.data;
            }

            if (priceFilter) {
                const filteredByPrice = await filterProductsByPrice(priceFilter);
                filteredProductIds = filteredByPrice.data;
            }

            if (brandFilter) {
                const filteredByBrand = await filterProductsByBrand(brandFilter);
                filteredProductIds = filteredByBrand.data;
            }

            setProducts(prevState => ({ ...prevState, totalCount: filteredProductIds.length }));
        } catch (error) {
            console.error('Error updating total count:', error);
        }
    };

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
        setNameFilter('');
        setPriceFilter('');
        updateTotalCount();
    };

    return {
        products,
        nameFilter,
        priceFilter,
        brandFilter,
        handleNameFilterChange,
        handlePriceFilterChange,
        handleBrandFilterChange,
        brandOptions,
        totalPages,
        handlePageChange,
        loadedProductsCount,
        page
    };
};

export default useProducts;// ProductList.js
