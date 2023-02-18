import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "../reducers/product.reducer";


export const getProductsState = createFeatureSelector<ProductState>('products');

export const getProducts = createSelector(getProductsState, (state) => state.products);
