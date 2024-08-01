import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-editstudentdetails',
  templateUrl: './editstudentdetails.component.html',
  styleUrls: ['./editstudentdetails.component.scss'],
})
export class EditstudentdetailsComponent implements OnInit {
  studentForm!: FormGroup;
  isEditMode = false;
  studentId!: string;
  batches: any[] = [];

  constructor(
    private fb: FormBuilder,
    private studentService: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      parentsNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      batchName: ['', Validators.required],
    });

    this.fetchBatches();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.studentId = params['id'];
        this.isEditMode = true;
        this.loadStudentDetails(this.studentId);
      }
    });
  }

  fetchBatches(): void {
    this.studentService.getAllStudenBatchNames().subscribe(
      (data) => {
        console.log('ALL Batches', data.batches);
        this.batches = data.batches; // Assuming the response is an array of batch names
      },
      (error) => {
        console.error('Error fetching batch names', error);
      }
    );
  }

  loadStudentDetails(id: string): void {
    // Load student details by ID from the service and populate the form
  }

  submitStudentForm(): void {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;
      if (this.isEditMode) {
        this.studentService.updateStudent(this.studentId, formData).subscribe(
          (response) => {
            this.toastr.success('Student updated successfully', 'Success');
            this.router.navigate(['/list_of_students']);
          },
          (error) => {
            this.toastr.error(
              error?.error?.msg || 'Something Went Wrong',
              'Error'
            );
          }
        );
      } else {
        this.studentService.addStudent(formData).subscribe(
          (response) => {
            this.toastr.success('Student created successfully', 'Success');
            this.studentForm.reset();
            this.router.navigate(['/list_of_students']);
          },
          (error) => {
            this.toastr.error(
              error?.error?.msg || 'Something Went Wrong',
              'Error'
            );
          }
        );
      }
    }
  }
}
