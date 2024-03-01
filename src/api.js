import axios from 'axios';
import md5 from 'md5';

const API_URL = process.env.REACT_APP_API_URL;
const PASSWORD = process.env.REACT_APP_PASSWORD;

const generateAuthString = () => {
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  return md5(`${PASSWORD}_${timestamp}`);
};

export const fetchProducts = async (page) => {
  try {
    const authString = generateAuthString();
    const response = await axios.post(
      API_URL,
      {
        action: 'get_ids',
        params: {
          offset: (page - 1) * 50,
          limit: 1000
        }
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

export const fetchItems = async (ids) => {
  try {
    const authString = generateAuthString();
    const response = await axios.post(
      API_URL,
      {
        action: 'get_items',
        params: {
          ids: ids
        }
      },
      { headers: { 'X-Auth': authString } }
    );
    return {
      data: response.data.result,
      totalCount: response.data.result.length
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
