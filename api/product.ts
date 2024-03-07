import { axiosInstance } from "./axiosClient";

const API_URL = process.env.API_URL || "http://localhost:8099/api";

export const API_PRODUCT = {
  GET_ALL: `${API_URL}/products`,
};

const fetchProducts = async () => {
  const res = await axiosInstance.get(API_PRODUCT.GET_ALL);

  if (res.status === 200) {
    const data = await res.data;
    return data;
  }
  return null;
};

export const handleProductRequest = {
  fetchProducts,
};
