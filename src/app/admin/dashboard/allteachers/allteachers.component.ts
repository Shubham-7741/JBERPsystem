import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-allteachers',
  templateUrl: './allteachers.component.html',
  styleUrls: ['./allteachers.component.scss'],
})
export class AllteachersComponent implements OnInit {
  // public dataLoaded: boolean = false;
  batchForm: FormGroup;
  selectedBatchId: string | null = null;
  selectedTeacher: any;
  @ViewChild('presentySheetModal') presentySheetModal: any;
  batches: any[] = [];
  teachers: any[] = [];
  presentyData: any[] = [];
  selectedMonth: string = ''; // Initialize selectedMonth variable
  imageToShow: string | null = null;

  constructor(
    private service: ServiceService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.batchForm = this.fb.group({
      batchName: [''],
    });
  }

  ngOnInit(): void {
    // this.getAllTeacherList();
    this.fetchBatches();
  }

  fetchBatches(): void {
    this.service.getAllBatchNames().subscribe(
      (data) => {
        console.log('ALL Batches', data);
        this.batches = data.batches; // Assuming 'batches' is the correct property name in the response
      },
      (error) => {
        console.error('Error fetching batch names', error);
      }
    );
  }

  selectBatch(batchId: string) {
    this.selectedBatchId = batchId;
    if (batchId) {
      this.service.getBatch(batchId).subscribe({
        next: (response) => {
          console.log('Batch details', response);
          this.teachers = response.batche.teacher; // Set the teachers array to the teacher array from the response
        },
        error: (error) => {
          console.error('Error fetching batch data', error);
        },
      });
    } else {
      this.teachers = []; // Clear the array if no batch is selected
    }
  }

  // viewMore(teacherId: string) {
  //   this.service.getTeacherById(teacherId).subscribe((response) => {
  //     console.log('Getting teacher by ID', response.teacher);
  //     this.selectedTeacher = response.teacher;
  //     const modalRef = this.modalService.open('teacherModal');
  //   });
  // }

  openModal(teacherId: string, content: any) {
    this.service.getTeacherById(teacherId).subscribe((data) => {
      this.selectedTeacher = data.teacher;
      this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
          (result) => {
            console.log(`Closed with: ${result}`);
          },
          (reason) => {
            console.log(`Dismissed: ${reason}`);
          }
        );
      (error: any) => {
        console.error('Error fetching village data:', error);
      };
    });
  }

  viewPresentySheet(teacherId: string) {
    if (!this.selectedMonth) {
      console.error('No month selected.');
      return;
    }

    this.service.getPresentyData(teacherId, this.selectedMonth).subscribe({
      next: (response) => {
        this.presentyData = this.transformPresentyData(response.presentyData);
        this.modalService.open(this.presentySheetModal, {
          ariaLabelledBy: 'presentySheetModal',
        });
      },
      error: (error) => {
        console.error('Error fetching presenty data', error);
      },
    });
  }

  transformPresentyData(data: any[]): any[] {
    const presentyList: any[] = [];
    data.forEach((monthData) => {
      Object.keys(monthData).forEach((month) => {
        if (Array.isArray(monthData[month])) {
          monthData[month].forEach((dayData: any) => {
            presentyList.push({
              date: `${dayData.date} ${month}`,
              status: dayData.status,
              photo: dayData.photo,
              description: dayData.description,
            });
          });
        }
      });
    });
    return presentyList;
  }

  openImage(imageSrc: string) {
    this.imageToShow = imageSrc;
  }

  closeImage() {
    this.imageToShow = null;
  }
  // getMonthIndex(monthName: string): number {
  //   const months = [
  //     'January',
  //     'February',
  //     'March',
  //     'April',
  //     'May',
  //     'June',
  //     'July',
  //     'August',
  //     'September',
  //     'October',
  //     'November',
  //     'December',
  //   ];
  //   return months.indexOf(monthName);
  // }

  // getAllTeacherList() {
  //   this.service.getAllTeacherDetails().subscribe({
  //     next: (res: any) => {
  //       console.log('Teachers data', res);

  //       // this.dataLoaded = true;
  //       this.dataSource = new MatTableDataSource(res);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //     },
  //     error: (err: any) => {
  //       alert(err);
  //     },
  //   });
  // }

  edit(id: number) {
    this.router.navigate(['/edit_teacher_details', id]);
  }

  showRecords(id: number) {
    this.router.navigate(['/allRecords', id]);
  }
}
