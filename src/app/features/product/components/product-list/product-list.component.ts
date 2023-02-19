import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store, select, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../../store/reducers/product.reducer';
import * as ProductActions from '../../store/actions/product.actions';
import { map, Observable, of, startWith, switchMap } from 'rxjs';
import { Product } from '../../store/actions/product.model';
import { getProducts } from '../../store/selectors/product.selectors';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';

export const uniqueNameValidatorAsync = (products: Product[]) => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const name = control.value.trim().toLowerCase();
    const duplicateProduct = products.find(product => product.name.trim().toLowerCase() === name);
    return of(duplicateProduct ? { uniqueNameAsync: true } : null);
  };
};


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild('dialogTemplate', { static: true })  dialogTemplate!: TemplateRef<any>;
  @ViewChild('dialogDeleteTemplate', { static: true })  dialogDeleteTemplate!: TemplateRef<any>;
  private dialogRef!: MatDialogRef<TemplateRef<any>>;

  dataSource = new MatTableDataSource<Product>([]);
  products$: Observable<Product[]> = this.store.pipe(select(getProducts));
  productForm: FormGroup;
  isNew: boolean = false;
  showDialog: boolean = false;

  constructor(private store: Store<ProductState>, private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.productForm = this.formBuilder.group({
      id:[''],
      name: ['', {
        validators:[Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{1,20}$/)],
        updateOn: 'blur'
      },],
      serial_number: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      price: ['', [Validators.required, Validators.min(0), Validators.max(1000)]]
    });
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
    this.products$.subscribe(products => {
      const nameAsyncValidator = uniqueNameValidatorAsync(products);
      this.productForm.get('name')?.setAsyncValidators(nameAsyncValidator);
      this.productForm.get('name')?.updateValueAndValidity();
      this.dataSource.data = products;
    });
  }

  addProduct(): void {
    this.productForm.reset();
    this.isNew = true;
    this.showDialog = true;
   this.dialogRef = this.dialog.open(this.dialogTemplate, {
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
    this.dialogRef = this.dialog.open(this.dialogDeleteTemplate, {
      width: '500px',
      data: { product }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        let {id} = product;
        this.store.dispatch(ProductActions.deleteProduct({ id }));
      }
    });
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      if (this.isNew) {
        product.id =  uuidv4();
        this.store.dispatch(ProductActions.addProduct({ product }));
      } else {
        this.store.dispatch(ProductActions.updateProduct({ product }));
      }
      this.dialogRef.close();
    }
  }
  
  
  
  

}
