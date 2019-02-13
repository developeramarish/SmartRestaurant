import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { TableService } from './services/table.service';
import { TableComponent } from './components/table/table.component';
import { ProductComponent } from './components/product/product.component';
import { ProductService } from './services/product.service';

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
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TableComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    TableService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
