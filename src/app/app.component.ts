import { Component, OnInit } from '@angular/core';
import { ServiceService } from './shared/service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'adminportal';

  // ngOnInit(): void {
  //   this.getUsersList()
  // }
  // constructor(private service: ServiceService) { }

  // getUsersList() {
  //   this.service.getAllUsers().subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //     },
  //     error: (err: any) => {
  //       alert(err);
  //     }
  //   })
  // }
}
