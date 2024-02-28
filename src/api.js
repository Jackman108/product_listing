import axios from 'axios';
import md5 from 'md5';

const API_URL = 'http://api.valantis.store:40000/';
const PASSWORD = 'Valantis';

// Функция для формирования авторизационной строки
const generateAuthString = () => {
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  return md5(`${PASSWORD}_${timestamp}`);
};

// Функция для отправки запроса на получение списка товаров
export const fetchProducts = async (page) => {
  try {
    const authString = generateAuthString();
    const response = await axios.post(
      API_URL,
      {
        action: 'get_ids',
        params: {
          offset: (page - 1) * 50,
          limit: 50
        }
      },
      { headers: { 'X-Auth': authString } }
    );
    return response.data.result;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Функция для применения фильтров к списку товаров
export const applyFilters = async (name, price, brand) => {
    try {
      const authString = generateAuthString();
      const response = await axios.post(
        API_URL,
        {
          action: 'filter',
          params: {
            product: name,
            price: parseFloat(price),
            brand: brand 
          }
        },
        { headers: { 'X-Auth': authString } }
      );
      return response.data.result;
    } catch (error) {
      console.error('Error applying filters:', error);
      throw error;
    }
  };

// Функция для получения списка товаров по их идентификаторам
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
      return response.data.result;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  };
  // Функция для фильтрации списка товаров по названию и цене
export const filterProducts = async (name, price) => {
    try {
      const authString = generateAuthString();
      const response = await axios.post(
        API_URL,
        {
          action: 'filter',
          params: {
            product: name,
            price: parseFloat(price)
          }
        },
        { headers: { 'X-Auth': authString } }
      );
      return response.data.result;
    } catch (error) {
      console.error('Error filtering products:', error);
      throw error;
    }
  };
  