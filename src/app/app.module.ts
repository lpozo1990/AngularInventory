import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ProductListComponent } from './features/product/components/product-list/product-list.component';
import { productReducer } from './features/product/store/reducers/product.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './features/product/store/effects/products.effects';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ products: productReducer }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    EffectsModule.forRoot([ProductEffects]),
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatInputModule
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
