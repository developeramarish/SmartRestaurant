import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/models/table';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  title: string = 'TABLES';
  tables: Table[];

  constructor(private service: TableService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getTables().then(res => this.tables = res as Table[]);
  }

  form = this.fb.group({
    tableName: [null, Validators.compose([Validators.required, Validators.maxLength(10)])],
    isAvailable: [true]
  });

  onSubmit(form: NgForm): void {
    this.service.postTable(form.value).subscribe(
      (res: Table) => {
        this.tables.push(res);
        this.toastr.success('You have been inserted the table successfully.', 'Successfully');
        form.reset({
          tableName: null,
          isAvailable: true
        });
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  onDelete(table: Table): void {
    if (confirm('Are you sure to delete ' + table.tableName + '?')) {
      this.service.deleteTable(table).subscribe(
        res => {
          const index = this.tables.indexOf(table);
          this.tables.splice(index, 1);
          this.toastr.warning('You have been deleted the table successfully.', 'Successfully');
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

  reset(form: NgForm): void {
    form.reset({
      tableName: null,
      isAvailable: true
    });
  }

}
