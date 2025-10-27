import axios, { AxiosError } from 'axios';
const BASE_URL = 'https://dummyjson.com';

export interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price?: number;
  description?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await axios.get<ProductsResponse>(`${BASE_URL}/products`, {
      timeout: 10000,
    });
    return data.products;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Connection timeout - please try again');
      }
      if (!error.response) {
        throw new Error('Network error - please check your connection');
      }
      throw new Error(error.response.data?.message || 'Failed to fetch products');
    }
    throw error;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const { data } = await axios.get<ProductsResponse>(
      `${BASE_URL}/products/category/${category}`,
      { timeout: 10000 }
    );
    return data.products;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Connection timeout - please try again');
      }
      if (!error.response) {
        throw new Error('Network error - please check your connection');
      }
      throw new Error(error.response.data?.message || 'Failed to fetch category products');
    }
    throw error;
  }
};

export interface DeleteResponse {
  id: number;
  isDeleted: boolean;
  deletedOn: string;
}

export const deleteProduct = async (id: number): Promise<DeleteResponse> => {
  try {
    const { data } = await axios.delete<DeleteResponse>(`${BASE_URL}/products/${id}`, {
      timeout: 8000
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Delete timeout - please try again');
      }
      if (!error.response) {
        throw new Error('Network error - please check your connection');
      }
      throw new Error(error.response.data?.message || 'Failed to delete product');
    }
    throw error;
  }
};
