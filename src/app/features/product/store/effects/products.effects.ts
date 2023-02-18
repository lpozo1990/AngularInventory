import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProductActions from '../actions/product.actions';
import { ProductService } from '../../services/product.service';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) => of(ProductActions.loadProductsFailure({ error })))
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      switchMap((action) =>
        this.productService.addProduct(action.product).then(() => {
          return ProductActions.addProductSuccess({ product: action.product });
        })
      ),
      catchError((error) => of(ProductActions.addProductFailure({ error })))
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      switchMap((action) =>
        this.productService.updateProduct(action.product).then(() => {
          return ProductActions.updateProductSuccess({ product: action.product });
        })
      ),
      catchError((error) => of(ProductActions.updateProductFailure({ error })))
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      switchMap((action) =>
        this.productService.deleteProduct(action.id).then(() => {
          return ProductActions.deleteProductSuccess({ id: action.id });
        })
      ),
      catchError((error) => of(ProductActions.deleteProductFailure({ error })))
    )
  );

  constructor(private actions$: Actions, private productService: ProductService) {}
}
