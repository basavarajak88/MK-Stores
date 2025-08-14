import axios from 'axios';
import { Product } from '@/contexts/CartContext';

const API_BASE = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL: API_BASE,
});

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  console.log('Fetched products:', response.data.slice(0, 2)); // Log first 2 products
  return response.data;
};

export const fetchProduct = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await api.get('/products/categories');
  return response.data;
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await api.get(`/products/category/${category}`);
  console.log(`Fetched ${category} products:`, response.data.slice(0, 2)); // Log first 2 products
  return response.data;
};