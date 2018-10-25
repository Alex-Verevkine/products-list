import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSortModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoadingSpinnerService } from './components/loading-spinner/loading-spinner.service';
const appRoutes: Routes = [{ path: '', redirectTo: 'Home', pathMatch: 'full' }, { path: 'Home', component: AppComponent }, { path: 'Home/:page', component: AppComponent }];
@NgModule({
    declarations: [AppComponent, ProductsTableComponent, ProductModalComponent, LoadingSpinnerComponent],
    imports: [
    BrowserModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSortModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ],
    providers: [, ProductService, LoadingSpinnerService],
    bootstrap: [AppComponent],
    entryComponents: [ProductModalComponent],
    })
export class AppModule {}
