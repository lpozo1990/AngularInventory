import { createReducer, on } from '@ngrx/store';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
  addProduct,
  addProductSuccess,
  addProductFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
} from '../actions/product.actions';
import { Product } from '../actions/product.model';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: any;
}

export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
    error: null,
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    products: [],
    loading: false,
    error,
  })),
  on(addProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(addProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
    loading: false,
    error: null,
  })),
  on(addProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(updateProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(updateProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map((p) => (p.id === product.id ? product : p)),
    loading: false,
    error: null,
  })),
  on(updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(deleteProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(deleteProductSuccess, (state, { id }) => ({
    ...state,
    products: state.products.filter((p) => p.id !== id),
    loading: false,
    error: null,
  })),
  on(deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
