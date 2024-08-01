import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

interface Student {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-allstudents',
  templateUrl: './allstudents.component.html',
  styleUrls: ['./allstudents.component.scss'],
})
export class AllstudentsComponent implements OnInit {
  batches: any[] = [];
  students: any[] = [];
  attendanceForm: FormGroup;
  isSubmitEnabled = false;

  constructor(
    private studentService: ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.attendanceForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.studentService.getAllStudentsBatch().subscribe((response) => {
      if (response.status === 'success') {
        this.batches = response.batches;
      }
    });
  }

  selectBatch(batchId: string): void {
    this.studentService.getStudentByBatchId(batchId).subscribe((response) => {
      if (response.status === 'success') {
        this.students = response.studentList.student;
        this.populateAttendanceForm();
      }
    });
  }

  populateAttendanceForm(): void {
    this.attendanceForm = this.fb.group({});
    this.students.forEach((student) => {
      this.attendanceForm.addControl(student._id, this.fb.control(false));
    });
    this.isSubmitEnabled = false;
  }

  onCheckboxChange(): void {
    this.isSubmitEnabled = Object.values(this.attendanceForm.value).some(
      (value) => value === true
    );
  }

  submitAttendance(): void {
    const presentStudentIds = Object.entries(this.attendanceForm.value)
      .filter(([_, isPresent]) => isPresent)
      .map(([studentId, _]) => studentId);

    const attendanceData = {
      data: {
        students: presentStudentIds,
      },
    };

    this.studentService.markStudentAttendance(attendanceData).subscribe(
      (response) => {
        if (response.status === 'success') {
          console.log('Attendance marked successfully:', response);
          this.toastr.success('Attendance marked successfully');
          this.attendanceForm.reset();
        } else {
          this.toastr.error('Failed to mark attendance!');
        }
      },
      (error) => {
        console.error('Error marking attendance:', error);
        this.toastr.error(error.error?.msg || 'Something went wrong', 'Error');
      }
    );
  }

  // batches: any[] = [];
  // students: any[] = [];
  // displayedColumns: string[] = ['name'];

  // constructor(private studentService: ServiceService) {}

  // ngOnInit(): void {
  //   this.getBatches();
  // }

  // getBatches(): void {
  //   this.studentService.getAllStudentsBatch().subscribe(
  //     (response: any) => {
  //       console.log('Getting all student Batches', response.batches);
  //       this.batches = response.batches;
  //     },
  //     (error) => {
  //       console.error('Error fetching batches', error);
  //     }
  //   );
  // }

  // selectBatch(batchId: string): void {
  //   this.studentService.getStudentByBatchId(batchId).subscribe(
  //     (response: any) => {
  //       console.log(
  //         'Getting all students by BatchId',
  //         response.studentList.student
  //       );
  //       this.students = response.studentList.student;
  //     },
  //     (error) => {
  //       console.error('Error fetching students', error);
  //     }
  //   );
  // }

  // batches: any[] = [];
  // students: any[] = [];

  // constructor(private studentService: ServiceService, private router: Router) {}

  // ngOnInit(): void {
  //   this.fetchAllBatches();
  // }

  // fetchAllBatches() {
  //   this.studentService.getAllStudentsBatch().subscribe(
  //     (response: any) => {
  //       if (response.status === 'success') {
  //         console.log('Getting all student Batches', response.batches);
  //         this.batches = response.batches;
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching batches', error);
  //     }
  //   );
  // }

  // selectBatch(batchId: string) {
  //   this.studentService.getStudentByBatchId(batchId).subscribe(
  //     (response: any) => {
  //       if (response.status === 'success') {
  //         console.log(
  //           'Getting all students by BatchId',
  //           response.studentList.student
  //         );
  //         this.students = response.studentList.student;
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching students', error);
  //     }
  //   );
  // }
}
