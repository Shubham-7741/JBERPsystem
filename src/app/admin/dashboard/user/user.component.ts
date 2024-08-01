import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EdituserFormComponent } from 'src/app/edituser-form/edituser-form.component';
import { ServiceService } from 'src/app/shared/service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  subscription: any;
  status: any;
  dialog: any;

  displayedColumns: string[] = [
    'userid',
    'username',
    'mobileno',
    'businessid',
    'userrole',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // public dataLoaded: boolean = false;

  ngOnInit(): void {
    this.getUsersList();
  }
  constructor(private service: ServiceService, dialog: MatDialog) {}

  openEditUserForm() {
    this.dialog.open(EdituserFormComponent);
  }

  getUsersList() {
    this.service.getAllUserDetails().subscribe({
      next: (res: any) => {
        console.log('Users data', res);

        // this.dataLoaded = true;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        alert(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
