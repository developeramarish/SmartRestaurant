import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

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
import { OrderProductComponent } from './components/order-product/order-product.component';
import { OrderService } from './services/order.service';
import { OrderProductService } from './services/order-product.service';
import { CreateOrderProductComponent } from './components/order-product/create-order-product/create-order-product.component';

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
    path: 'order/insert/:id',
    component: OrderProductComponent
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
    OrderProductComponent,
    CreateOrderProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    TableService,
    ProductService,
    OrderService,
    OrderProductService
  ],
  entryComponents: [
    CreateOrderComponent,
    CreateOrderProductComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
