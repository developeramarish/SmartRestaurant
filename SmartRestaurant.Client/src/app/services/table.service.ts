import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from '../models/table';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private readonly url = 'https://localhost:44373/api/tables/';
  private readonly availableUrl = 'https://localhost:44373/api/availabletables/';

  constructor(private http: HttpClient) { }

  getTables() {
    return this.http.get(this.url).toPromise();
  }

  getAvailableTables() {
    return this.http.get(this.availableUrl).toPromise();
  }

  postTable(table: Table) {
    return this.http.post(this.url, table);
  }

  deleteTable(table: Table) {
    return this.http.delete(this.url + table.id);
  }
}
