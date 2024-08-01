import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../shared/service.service';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-edituser-form', 
  templateUrl: './edituser-form.component.html',
  styleUrls: ['./edituser-form.component.scss']
})
export class EdituserFormComponent implements OnInit {
  // editData: any;
  // id: any;
  route: any;
  userid!: any;
  // user!: any;

  

  // editUserForm = this.builder.group({
  //   username: this.builder.control('', Validators.required),
  //   mobile: this.builder.control('', Validators.required),
  //   businessname: this.builder.control('', Validators.required),
  //   userrole: this.builder.control('', Validators.required),
  //   useraccess: this.builder.control('', Validators.required),
  //   androidId: this.builder.control('', Validators.required),
  //   deviceInfo: this.builder.control('', Validators.required),
  //   status: this.builder.control(false),
  // });
 
  


  constructor(private builder: FormBuilder, private service: ServiceService, route: ActivatedRoute) {
  }

  ngOnInit(){
    this.userid = this.route.snapshot.paramMap.get('userid');
    alert(this.userid);
    // this.service.getById()
    // this.loadUserdetail(1);

  }


  // loadUserdetail(code: any) {

  //   this.editData = {
  //     username: "abc",
  //     mobile: '9877665566',
  //     businessname: 'kj',
  //     userrole: 'iuiu',
  //     useraccess: 'iuiui',
  //     androidId: 'fdf',
  //     deviceInfo: 'dd',
  //     status: 'hjh'

  //   }
  //   this.editUserForm.setValue({
  //     username: this.editData.username,
  //     mobile: this.editData.mobile,
  //     businessname: this.editData.businessname,
  //     userrole: this.editData.userrole,
  //     useraccess: this.editData.useraccess,
  //     androidId: this.editData.androidId,
  //     deviceInfo: this.editData.deviceInfo,
  //     status: this.editData.status
  //   });

  //   // this.service.getById(code).subscribe(res => {

  //   //   this.editData = res;
  //   //   console.log(this.editData);
  //   //   this.registerForm.setValue({
  //   //     username: this.editData.id, mobile: this.editData.phone,
  //   //     businessname: this.editData.busines, userrole: this.editData.role, useraccess: this.editData.access,
  //   //     androidId: this.editData.androidId, deviceInfo: this.editData.deviceInfo,
  //   //     status: this.editData.status
  //   //   });


  //   // })
  // }

  updateUserDetails() { 
    // console.log(this.editUserForm.value)

  }


}
