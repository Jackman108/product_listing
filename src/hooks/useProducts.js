import { useState, useEffect, useCallback } from 'react';
import {
    fetchProducts,
    fetchItems,
    fetchFields,
    filterProductsByName,
    filterProductsByPrice,
    filterProductsByBrand
} from '../api/products';

const useProducts = () => {
    const [productIds, setProductIds] = useState([]);
    const [products, setProducts] = useState({ data: [], totalCount: 0 });
    const [page, setPage] = useState(1);
    const [nameFilter, setNameFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [brandOptions, setBrandOptions] = useState([]);
    const [loading, setLoading] = useState(false); 
    const totalPages = Math.ceil(products.totalCount / 50);

    const applyFilters = useCallback(async (ids) => {
        let filteredIds = [...ids];
    
        try {
            if (nameFilter) {
                const filteredByName = await filterProductsByName(nameFilter);
                filteredIds = filteredIds.filter(id => filteredByName.data.includes(id));
            }
    
            if (priceFilter) {
                const filteredByPrice = await filterProductsByPrice(priceFilter);
                filteredIds = filteredIds.filter(id => filteredByPrice.data.includes(id));
            }
    
            if (brandFilter) {
                const filteredByBrand = await filterProductsByBrand(brandFilter);
                filteredIds = filteredIds.filter(id => filteredByBrand.data.includes(id));
            }
        } catch (error) {
            console.error('Error applying filters:', error);
            console.log('Retrying...');
            return applyFilters(ids); // Retry applying filters
        }
    
        return filteredIds;
    }, [nameFilter, priceFilter, brandFilter]);
    

    useEffect(() => {
        const loadInitialProducts = async () => {
            try {
                if (productIds.length === 0) {
                    const { data: fetchedProductIds } = await fetchProducts();
                    setProductIds(fetchedProductIds);
                }
            } catch (error) {
                console.error('Error fetching initial product IDs:', error);
                if (error.response && error.response.status === 500) {
                    console.error('fetching initial, retrying...');
                    await loadInitialProducts();
                    return;
                }
            }
        };

        loadInitialProducts();
    }, [productIds]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                if (productIds.length === 0) return;

                const filteredIds = await applyFilters(productIds);
                setLoading(true);
                setProducts(prevState => ({
                    ...prevState,
                    totalCount: filteredIds.length
                }));

                const startIndex = (page - 1) * 50;
                const pageFilteredIds = filteredIds.slice(startIndex, startIndex + 50);

                const productsData = await fetchItems(pageFilteredIds);
                setProducts({ data: productsData.data, totalCount: filteredIds.length });
            } catch (error) {
                console.error('Error loading products:', error);
                if (error.response && error.response.status === 500) {
                    console.error('loading products, retrying...');
                    await loadProducts();
                    return;
                }
            }finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [page, productIds, applyFilters]);

    useEffect(() => {
        const loadBrandOptions = async () => {
            try {
                const options = await fetchFields('brand');
                setBrandOptions(options.data);
            } catch (error) {
                console.error('Error loading brand options:', error);
                if (error.response && error.response.status === 500) {
                    console.error('loading brand, retrying...');
                    await loadBrandOptions();
                    return;
                }
            }
        };
        loadBrandOptions();
    }, []);

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

    return {
        products,
        nameFilter,
        priceFilter,
        brandFilter,
        loading,
        handleNameFilterChange,
        handlePriceFilterChange,
        handleBrandFilterChange,
        brandOptions,
        totalPages,
        handlePageChange,
        page
    };
};

export default useProducts;
