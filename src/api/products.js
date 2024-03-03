import axios from 'axios';
import { generateAuthString } from '../utils/auth.js';
import { removeDuplicateProductsId } from '../helpers/removeDuplicateProductsId.js';

const API_URL = 'http://api.valantis.store:40000/'


const handleRequestError = async (error, retryFunction) => {
    if (error.response && error.response.status === 500) {
        console.error('response error, retrying...');
        await retryFunction();
        return;
    }
    console.error('Error:', error);
    throw error;
};

export const fetchProducts = async () => {
    try {
        let productIds = [];
        let totalCount = 0;
        let offset = 0;
        const limit = 10000;

        while (true) {
            const authString = generateAuthString();
            const response = await axios.post(
                API_URL,
                {
                    action: 'get_ids',
                    params: {
                        offset,
                        limit
                    }
                },
                { headers: { 'X-Auth': authString } }
            );
            if (response && response.data && response.data.result.length === 0) {
                break;
            }

            productIds = productIds.concat(response.data.result);
            offset += limit;
        }

        productIds = removeDuplicateProductsId(productIds);
        totalCount = productIds.length;

        return { data: productIds, totalCount };
    } catch (error) {
        await handleRequestError(error, () => fetchProducts());
    }
};

export const fetchItems = async (ids) => {
    try {
        const authString = generateAuthString();
        const items = [];

        for (let i = 0; i < ids.length; i += 50) {
            const chunk = ids.slice(i, i + 50);
            const response = await axios.post(
                API_URL,
                {
                    action: 'get_items',
                    params: {
                        ids: chunk
                    }
                },
                { headers: { 'X-Auth': authString } }
            );

            const productsWithId = response.data.result.map((product, index) => ({
                ...product,
                id: `${product.id}-${index}`
            }));

            productsWithId.forEach(product => {
                if (!items.some(item => item.id === product.id)) {
                    items.push(product);
                }
            });
        }

        return {
            data: items,
            totalCount: items.length
        };
    } catch (error) {
        await handleRequestError(error, () => fetchItems(ids));
    }
};

export const filterProductsByName = async (name) => {
    try {
        const authString = generateAuthString();
        const response = await axios.post(
            API_URL,
            {
                action: 'filter',
                params: {
                    product: name
                }
            },
            { headers: { 'X-Auth': authString } }
        ).catch(async (error) => await handleRequestError(error, () => filterProductsByName(name)));
        return {
            data: response.data.result,
            totalCount: response.data.result.length
        };
    } catch (error) {
        await handleRequestError(error, () => filterProductsByName(name));
    }
};

export const filterProductsByPrice = async (price) => {
    try {
        const authString = generateAuthString();
        const response = await axios.post(
            API_URL,
            {
                action: 'filter',
                params: {
                    price: parseFloat(price)
                }
            },
            { headers: { 'X-Auth': authString } }
        );
        return {
            data: response.data.result,
            totalCount: response.data.result.length
        };
    } catch (error) {
        await handleRequestError(error, () => filterProductsByPrice(price));
    }
};

export const filterProductsByBrand = async (brand) => {
    try {
        const authString = generateAuthString();
        const response = await axios.post(
            API_URL,
            {
                action: 'filter',
                params: {
                    brand: brand
                }
            },
            { headers: { 'X-Auth': authString } }
        );
        return {
            data: response.data.result,
            totalCount: response.data.result.length
        };
    } catch (error) {
        await handleRequestError(error, () => filterProductsByBrand(brand));
    }
};

export const fetchFields = async (field) => {
    try {
        const authString = generateAuthString();
        const response = await axios.post(
            API_URL,
            {
                action: 'get_fields',
                params: {
                    field: field,
                    offset: 0,
                    limit: 100
                }
            },
            { headers: { 'X-Auth': authString } }
        );
        return {
            data: response.data.result.filter(param => param !== null)
        };
    } catch (error) {
        await handleRequestError(error, () => fetchFields(field));
    }
};
