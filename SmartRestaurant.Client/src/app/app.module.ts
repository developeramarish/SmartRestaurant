import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { TableService } from './services/table.service';
import { TableComponent } from './components/table/table.component';
import { ProductComponent } from './components/product/product.component';
import { ProductService } from './services/product.service';
import { ListOrderComponent } from './components/order/list-order/list-order.component';
import { CreateOrderComponent } from './components/order/create-order/create-order.component';
import { OrderService } from './services/order.service';
import { OrderProductService } from './services/order-product.service';
import { InsertProductComponent } from './components/order/insert-product/insert-product.component';
import { ListProductComponent } from './components/order/list-product/list-product.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'tables',
    component: TableComponent
  },
  {
    path: 'products',
    component: ProductComponent
  },
  {
    path: 'orders',
    component: ListOrderComponent
  },
  {
    path: 'order/:id/details',
    component: ListProductComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TableComponent,
    ProductComponent,
    ListOrderComponent,
    CreateOrderComponent,
    InsertProductComponent,
    ListProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot()
  ],
  providers: [
    TableService,
    ProductService,
    OrderService,
    OrderProductService
  ],
  entryComponents: [
    CreateOrderComponent,
    InsertProductComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
