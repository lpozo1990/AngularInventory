import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store, select, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../../store/reducers/product.reducer';
import * as ProductActions from '../../store/actions/product.actions';
import { Observable } from 'rxjs';
import { Product } from '../../store/actions/product.model';
import { getProducts } from '../../store/selectors/product.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild('dialogTemplate', { static: true })  dialogTemplate!: TemplateRef<any>;
  private dialogRef!: MatDialogRef<TemplateRef<any>>;

  dataSource = new MatTableDataSource<Product>([]);
  products$: Observable<Product[]> = this.store.pipe(select(getProducts));
  productForm: FormGroup;
  isNew: boolean = false;
  showDialog: boolean = false;

  constructor(private store: Store<ProductState>, private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.productForm = this.formBuilder.group({
      id:[''],
      name: ['', [Validators.required, Validators.maxLength(20)]],
      serial_number: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      price: ['', [Validators.required, Validators.min(0), Validators.max(1000)]]
    });
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
    this.products$.subscribe(products => {
      this.dataSource.data = products;
    });
  }

  addProduct(): void {
    this.productForm.reset();
    this.isNew = true;
    this.showDialog = true;
    const dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '500px'
    });
  }
  

  updateProduct(product:Product): void {
    this.productForm.setValue(product);
    this.isNew = false;
    this.showDialog = true;
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '500px'
    });
  }
  

  deleteProduct(product: Product): void {
    // this.productService.deleteProduct(product.id).subscribe(() => {
    //   const products = this.products$.getValue();
    //   const index = products.findIndex(p => p.id === product.id);
    //   if (index >= 0) {
    //     products.splice(index, 1);
    //     this.products$.next(products);
    //     this.dataSource.data = products;
    //   }
    // });
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      if (this.isNew) {
        this.store.dispatch(ProductActions.addProduct({ product }));
      } else {
        this.store.dispatch(ProductActions.updateProduct({ product }));
      }
      this.dialogRef.close();
    }
  }
  
  
  
  

}
