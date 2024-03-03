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
    const [products, setProducts] = useState({ data: [], totalCount: 0 });
    const [page, setPage] = useState(1);
    const [nameFilter, setNameFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [brandOptions, setBrandOptions] = useState([]);
    const [loadedProductsCount, setLoadedProductsCount] = useState(0);
    const totalPages = Math.ceil(products.totalCount / 50);

    const applyFilters = useCallback(async (productIds) => {
        let filteredProductIds = [...productIds]; 

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

        return filteredProductIds;
    }, [nameFilter, priceFilter, brandFilter]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const { data: productIds, totalCount } = await fetchProducts(page);
                if (!productIds) {
                    setProducts({ data: [], totalCount: 0 });
                    return;
                }

                let filteredProductIds = await applyFilters(productIds);

                setProducts(prevState => ({
                    ...prevState,
                    totalCount: totalCount
                }));

                const startIndex = (page - 1) * 50;
                const pageFilteredProductIds = filteredProductIds.slice(startIndex, startIndex + 50 - loadedProductsCount);

                const productsData = await fetchItems(pageFilteredProductIds);

                setProducts({ data: productsData.data.slice(0, 50), totalCount });

                setLoadedProductsCount(productsData.data.length);
            } catch (error) {
                console.error('Error loading products:', error);
            }
        };
        loadProducts();
    }, [page, loadedProductsCount, applyFilters]);

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
            const filteredProductIds = await applyFilters([]);

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
        setBrandFilter('');
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

export default useProducts;
