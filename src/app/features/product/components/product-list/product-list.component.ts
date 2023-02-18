import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from '../../store/reducers/product.reducer';
import * as ProductActions from '../../store/actions/product.actions';
import { Observable } from 'rxjs';
import { Product } from '../../store/actions/product.model';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<any> = this.store.select(state => state.products);


  constructor(private store: Store<ProductState>) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  deleteProduct(id: string) {
    if (confirm('¿Está seguro que desea eliminar este producto?')) {
      this.store.dispatch(ProductActions.deleteProduct({ id }));
    }
  }
  
  updateProduct(product: Product) {
    this.store.dispatch(ProductActions.updateProduct({ product }));
  }
  
  

}
