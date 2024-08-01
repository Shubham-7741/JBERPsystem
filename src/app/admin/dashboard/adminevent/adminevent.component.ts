import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../shared/service.service';

@Component({
  selector: 'app-adminevent',
  templateUrl: './adminevent.component.html',
  styleUrls: ['./adminevent.component.scss'],
})
export class AdmineventComponent implements OnInit {
  eventForm!: FormGroup;
  imagePreviews: string[] = [];
  Images: File[] = [];
  fileError: string | null = null;
  isEditMode = false;
  eventId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: ServiceService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      links: [''],
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.eventId = params['id'];
        this.isEditMode = true;
        if (this.eventId) {
          this.loadEventDetails(this.eventId);
        }
      }
    });
  }

  loadEventDetails(id: string): void {
    this.eventService.getEventById(id).subscribe((event) => {
      this.eventForm.patchValue(event);
      this.imagePreviews = event.Images.map((img: any) => img.url);
      // Handle loading existing images if necessary
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const files = Array.from(event.target.files) as File[];

      if (files.length > 3) {
        this.fileError = 'You can upload a maximum of 3 images.';
        return;
      }

      this.fileError = null;
      this.Images = files;
      this.imagePreviews = [];

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => this.imagePreviews.push(reader.result as string);
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    this.Images.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  submitEvent(): void {
    if (this.eventForm.valid) {
      const formData = new FormData();
      formData.append('eventName', this.eventForm.get('eventName')!.value);
      formData.append('description', this.eventForm.get('description')!.value);
      formData.append('links', this.eventForm.get('links')!.value);

      this.Images.forEach((Image, index) => {
        formData.append('Images', Image, Image.name);
      });

      if (this.isEditMode && this.eventId) {
        this.eventService.updateEvent(this.eventId, formData).subscribe(
          (response) => {
            if (response.status === 'success') {
              this.toastr.success('Event updated successfully', 'Success');
              this.router.navigate(['/list_of_events']);
            } else {
              console.error('Event creation failed', response.msg);
              this.toastr.error('Event creation failed', 'Error');
            }
          },
          (error) => {
            console.error('Error updating event', error);
            this.toastr.error(
              error.error?.msg || 'Something went wrong',
              'Error'
            );
          }
        );
      } else {
        this.eventService.createEvent(formData).subscribe(
          (response) => {
            if (response.status === 'success') {
              this.toastr.success('Event created successfully', 'Success');
              this.router.navigate(['/list_of_events']);
            } else {
              console.error('Event creation failed', response.msg);
              this.toastr.error('Event creation failed', 'Error');
            }
          },
          (error) => {
            console.error('Error creating event', error);
            this.toastr.error(
              error.error?.msg || 'Something went wrong',
              'Error'
            );
          }
        );
      }
    }
  }
}
