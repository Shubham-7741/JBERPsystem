import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-editteacherdeatils',
  templateUrl: './editteacherdeatils.component.html',
  styleUrls: ['./editteacherdeatils.component.scss'],
})
export class EditteacherdeatilsComponent implements OnInit {
  addTeacherForm!: FormGroup;
  hidePassword: boolean = false;
  hideCPassword: boolean = false;
  showUpdate: boolean = false;
  showSubmit: boolean = true;
  teacherId!: string; // Non-null assertion operator
  batches: any[] = [];

  constructor(
    private fb: FormBuilder,
    private teacherService: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.addTeacherForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', Validators.required],
      conPassword: ['', Validators.required],
      startingDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      teachercategory: ['', Validators.required], // Renamed to teachercategory
      customCategory: [''],
      teacherSalary: [''],
      batchName: ['', Validators.required],
    });

    this.fetchBatches();

    // this.route.params.subscribe((val) => {
    //   this.teacherId = val['id']; // Assuming the parameter name is 'id'
    //   // Fetch the product details using the ID and populate the form
    //   this.teacherService.getTeacherById(this.teacherId).subscribe({
    //     next: (res) => {
    //       this.onedit(res.teacher);
    //       console.log('Teachers Details:', res.teacher);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //   });
    // });

    // Check if we're in edit mode
    // this.route.paramMap.subscribe((params) => {
    //   this.teacherId = params.get('id');
    //   if (this.teacherId) {
    //     this.showSubmit = false;
    //     this.showUpdate = true;
    //     this.teacherService
    //       .getTeacherById(this.teacherId)
    //       .subscribe((teacher) => {
    //         this.addTeacherForm.patchValue(teacher);
    //       });
    //   }
    // });
  }

  // onedit(teacher: any) {
  //   this.showSubmit = false;
  //   this.showUpdate = true;
  //   // this.showelete = true;

  //   this.addTeacherForm.patchValue({
  //     name: teacher.name,
  //     address: teacher.address,
  //     email: teacher.email,
  //     mobile: teacher.mobile,
  //     password: teacher.pass,
  //     teacherSalary: teacher.teacherSalary,
  //     startingDate: teacher.startingDate,
  //     teachercategory: teacher.teachercategory,
  //     batchName: teacher.batchName,
  //   });
  // }

  // loadTeacherDetails(id: string): void {
  //   this.teacherService.getTeacherById(id).subscribe((teacher) => {
  //     console.log('getTeacherById', teacher);
  //     this.addTeacherForm.patchValue(teacher);
  //   });
  // }

  fetchBatches(): void {
    this.teacherService.getAllBatchNames().subscribe(
      (data) => {
        console.log('ALL Batches', data.batches);
        this.batches = data.batches; // Assuming the response is an array of batch names
      },
      (error) => {
        console.error('Error fetching batch names', error);
      }
    );
  }

  postTeachersDetails(): void {
    if (this.addTeacherForm.valid) {
      const teachercategoryControl = this.addTeacherForm.get('teachercategory');
      if (teachercategoryControl) {
        const formData = {
          ...this.addTeacherForm.value,
          teachercategory:
            teachercategoryControl.value === 'Custom'
              ? this.addTeacherForm.get('customCategory')?.value
              : teachercategoryControl.value,
        };

        this.teacherService.createTeacher(formData).subscribe(
          (response) => {
            if (response.status === 'success') {
              console.log('Teacher created successfully');
              this.addTeacherForm.reset();
              this.toastr.success('Teacher created successfully', 'Success');
              this.router.navigate(['/list_of_teachers']);
            } else {
              console.error('Failed to create teacher', response.msg);
            }
          },
          (error) => {
            console.error('Error creating teacher', error);
            this.toastr.error(
              error?.error?.msg || 'Something Went Wrong ',
              'Error'
            );
          }
        );
      } else {
        console.error('teachercategory form control is null or undefined');
      }
    }
  }

  // updateTeacherDetails(): void {
  //   if (this.addTeacherForm.valid && this.teacherId) {
  //     this.teacherService
  //       .updateTeacher(this.teacherId, this.addTeacherForm.value)
  //       .subscribe(() => {
  //         this.toastr.success('Teacher updated successfully', 'Success');
  //         this.router.navigate(['/list_of_teachers']);
  //       });
  //   } else {
  //     this.toastr.error('Please fill all the fields', 'Error');
  //   }
  // }

  togglePasswordVisibility(field: string): void {
    const inputField = document.getElementById(field) as HTMLInputElement;
    inputField.type = inputField.type === 'password' ? 'text' : 'password';
  }

  onCategoryChange(): void {
    const categoryControl = this.addTeacherForm.get('teachercategory');
    if (categoryControl?.value !== 'Custom') {
      this.addTeacherForm.get('customCategory')?.reset('');
      this.addTeacherForm.get('customCategory')?.clearValidators();
    } else {
      this.addTeacherForm
        .get('customCategory')
        ?.setValidators(Validators.required);
    }
    this.addTeacherForm.get('customCategory')?.updateValueAndValidity();
  }
  // togglePasswordVisibility(field: string) {
  //   if (field === 'passWord') {
  //     this.hidePassword = !this.hidePassword;
  //   } else if (field === 'conPassword') {
  //     this.hideCPassword = !this.hideCPassword;
  //   }
  // }

  get name(): FormControl {
    return this.addTeacherForm.get('name') as FormControl;
  }
  get Address(): FormControl {
    return this.addTeacherForm.get('address') as FormControl;
  }
  get Password(): FormControl {
    return this.addTeacherForm.get('password') as FormControl;
  }
  get ConfirmPassword(): FormControl {
    return this.addTeacherForm.get('conPassword') as FormControl;
  }
  get Email(): FormControl {
    return this.addTeacherForm.get('email') as FormControl;
  }
  get Mobile(): FormControl {
    return this.addTeacherForm.get('mobile') as FormControl;
  }
  get StartingDate(): FormControl {
    return this.addTeacherForm.get('startingDate') as FormControl;
  }
  get Category(): FormControl {
    return this.addTeacherForm.get('teachercategory') as FormControl;
  }
  get CustomCategory(): FormControl {
    return this.addTeacherForm.get('customCategory') as FormControl;
  }
  get TeacherSalary(): FormControl {
    return this.addTeacherForm.get('teacherSalary') as FormControl;
  }
}

// togglePasswordVisibility(field: string) {
//     if (field === 'passWord') {
//       this.hidePassword = !this.hidePassword;
//     } else if (field === 'conPassword') {
//       this.hideCPassword = !this.hideCPassword;
//     }
//   }

//   get name(): FormControl {
//     return this.addTeacherForm.get('name') as FormControl;
//   }
//   get Password(): FormControl {
//     return this.addTeacherForm.get('passWord') as FormControl;
//   }
//   get ConfirmPassword(): FormControl {
//     return this.addTeacherForm.get('conPassword') as FormControl;
//   }
//   get Email(): FormControl {
//     return this.addTeacherForm.get('email') as FormControl;
//   }
//   get MobileNo(): FormControl {
//     return this.addTeacherForm.get('mobileNo') as FormControl;
//   }
