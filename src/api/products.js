import axios from 'axios';
import { generateAuthString } from '../utils/auth.js';

const API_URL = process.env.REACT_APP_API_URL;

// возвращает идентификаторы всех имеющиеся товаров
export const fetchProducts = async () => {
    try {
        const authString = generateAuthString();
        const response = await axios.post(
            API_URL,
            {
                action: 'get_ids',
                params: {}
            },
            { headers: { 'X-Auth': authString } }
        );

        return {
            data: response.data.result,
            totalCount: response.data.result.length
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

//возвращает упорядоченный список товаров со всеми характеристиками, если переданы идентификаторы товаров
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
            items.push(...response.data.result);
        }

        return {
            data: items,
            totalCount: items.length
        };
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
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
        );
        return {
            data: response.data.result,
            totalCount: response.data.result.length
        };
    } catch (error) {
        console.error('Error filtering products by name:', error);
        throw error;
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
        console.error('Error filtering products by price:', error);
        throw error;
    }
};
//Возвращает упорядоченный список идентификаторов товаров, соответствующих заданному значению.
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
        console.error('Error filtering products by brand:', error);
        throw error;
    }
};
//возвращает при передаче параметра field упорядоченный список значений данного поля товаров.
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
        console.error('Error fetching fields:', error);
        throw error;
    }
};
