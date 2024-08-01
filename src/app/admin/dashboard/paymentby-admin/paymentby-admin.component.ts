import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-paymentby-admin',
  templateUrl: './paymentby-admin.component.html',
  styleUrls: ['./paymentby-admin.component.scss'],
})
export class PaymentbyAdminComponent implements OnInit {
  showForm = false;
  qrForm!: FormGroup;
  qrPreview: string | ArrayBuffer | null = null;
  payments: any[] = [];
  showPayments: boolean = false;
  imageToShow: string | null = null;

  constructor(
    private fb: FormBuilder,
    private qrService: ServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.qrForm = this.fb.group({
      QR: ['', Validators.required],
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  togglePayments(): void {
    this.showPayments = !this.showPayments;
    if (this.showPayments) {
      this.getAllPayments();
    }
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.qrForm.patchValue({
        QR: file,
      });

      // Preview the QR code image
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.qrPreview = reader.result;
      };
    }
  }

  submitQr(): void {
    if (this.qrForm.valid) {
      const formData = new FormData();
      formData.append('QR', this.qrForm.get('QR')!.value);

      this.qrService.uploadQR(formData).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.toastr.success('QR code uploaded successfully', 'Success');
            this.qrForm.reset();
            this.router.navigate(['/home']);
          } else {
            this.toastr.error(response.msg, 'Error');
          }
        },
        (error) => {
          this.toastr.error(
            error?.error?.msg || 'Something went wrong',
            'Error'
          );
        }
      );
    }
  }

  getAllPayments(): void {
    this.qrService.getAllPayments().subscribe(
      (response) => {
        if (response.status === 'success') {
          console.log('Getting all payments', response.allPayments);

          this.payments = response.allPayments;
        } else {
          this.toastr.error('Failed to fetch payments', 'Error');
        }
      },
      (error) => {
        this.toastr.error(error?.error?.msg || 'Something went wrong', 'Error');
      }
    );
  }

  approvePayment(paymentId: string): void {
    this.qrService.approveCourse(paymentId).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.toastr.success('Payment approved successfully', 'Success');
          this.getAllPayments();
        } else {
          this.toastr.error('Failed to approve payment', 'Error');
        }
      },
      (error) => {
        this.toastr.error(error?.error?.msg || 'Something went wrong', 'Error');
      }
    );
  }

  openImage(imageSrc: string) {
    this.imageToShow = imageSrc;
  }

  closeImage() {
    this.imageToShow = null;
  }
}
