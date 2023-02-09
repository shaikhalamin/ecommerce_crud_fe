import { ProductFormFields } from "../../components/dashboard/products/create/product.helpers";
import { ProductEditFormFields } from "../../components/dashboard/products/edit/product-edit.helpers";
import { axiosPrivate } from "../lib/axios-private";

export const getProducts = async () => {
  return axiosPrivate.get(`/product`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createProduct = async (productField: ProductFormFields) => {
  return axiosPrivate.post(`/product`, productField, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateProduct = async (
  id: number,
  productField: ProductEditFormFields
) => {
  return axiosPrivate.patch(`/product/${id}`, productField, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getProduct = async (id: number) => {
  return axiosPrivate.get(`/product/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteProduct = async (id: number) => {
  return axiosPrivate.delete(`/product/${id}`);
};

export const getFilterProducts = async (filterUrl: string) => {
  return axiosPrivate.get(`/product?${filterUrl}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
