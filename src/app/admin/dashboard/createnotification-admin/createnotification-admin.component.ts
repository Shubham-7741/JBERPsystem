import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-createnotification-admin',
  templateUrl: './createnotification-admin.component.html',
  styleUrls: ['./createnotification-admin.component.scss']
})
export class CreatenotificationAdminComponent implements OnInit {
  batches: any[] = [];
  teachers: any[] = [];
  notificationForm: FormGroup;
  teacherNotificationForm: FormGroup;
  selectedForm: string = 'batch';


  constructor(
    private fb: FormBuilder,
    private notificationService: ServiceService,
    private toastr: ToastrService
  ) {
    this.notificationForm = this.fb.group({
      selectedBatchId: ['', Validators.required],
      message: ['', Validators.required]
    });
    this.teacherNotificationForm = this.fb.group({
      selectedBatchId: ['', Validators.required],
      selectedTeacherId: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllBatchNames();
  }

  getAllBatchNames(): void {
    this.notificationService.getAllBatchNames().subscribe((response) => {
      if (response.status === 'success') {
        console.log('Getting all Batech', response.batches);

        this.batches = response.batches;
      }
    });
  }

  onBatchChange(batchId: string): void {
    this.notificationForm.get('selectedBatchId')?.setValue(batchId);
    this.teacherNotificationForm.get('selectedBatchId')?.setValue(batchId);
    this.getTeachersByBatch(batchId);
  }

  onTeacherChange(teacherId: string): void {
    this.teacherNotificationForm.get('selectedTeacherId')?.setValue(teacherId);
  }

  onMessageChange(event: Event, formControlName: string, form: FormGroup): void {
    const inputElement = event.target as HTMLTextAreaElement;
    form.get(formControlName)?.setValue(inputElement.value);
  }

  getTeachersByBatch(batchId: string): void {
    this.notificationService.getTeacherByBatchId(batchId).subscribe((response) => {
      if (response.status === 'success') {
        console.log('getTeachersByBatch', response.allTeachersData);

        this.teachers = response.allTeachersData;
      }
    });
  }

  submitNotification(): void {
    const batchId = this.notificationForm.get('selectedBatchId')?.value;
    const message = this.notificationForm.get('message')?.value;

    if (!batchId || !message) return;

    const notificationData = { message };

    this.notificationService.createNotification(batchId, notificationData).subscribe((response) => {
      if (response.status === 'success') {
        this.notificationForm.reset();
        this.toastr.success(response.msg);
      } else {
        this.toastr.error(response.msg);
      }
    });
  }

  submitTeacherNotification(): void {
    const teacherId = this.teacherNotificationForm.get('selectedTeacherId')?.value;
    const message = this.teacherNotificationForm.get('message')?.value;

    if (!teacherId || !message) return;

    const notificationData = { message };

    this.notificationService.createTeacherNotification(teacherId, notificationData).subscribe((response) => {
      if (response.status === 'success') {
        this.teacherNotificationForm.reset()
        this.toastr.success(response.msg);
      } else {
        this.toastr.error('Failed to send notification!');
      }
    });
  }

}