import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-pendingleaves-admin',
  templateUrl: './pendingleaves-admin.component.html',
  styleUrls: ['./pendingleaves-admin.component.scss']
})
export class PendingleavesAdminComponent implements OnInit {
  displayedColumns: string[] = ['reason', 'submittedOn', 'onDate', 'createdBy', 'status', 'action'];
  leaveForm: FormGroup;
  leaves: any[] = [];
  dataSource = new MatTableDataSource<any>();
  // statuses = ["NOACTON", "APPROVED", "NOTAPPROVED"];
  // selectedLeaveId: string | null = null;



  constructor(private leaveService: ServiceService, private fb: FormBuilder, private toastr: ToastrService,) {
    this.leaveForm = this.fb.group({
      selectedLeaveId: null,
      selectedStatus: 'NOACTON'
    });
  }

  ngOnInit(): void {
    this.getPendingLeaves();
  }

  getPendingLeaves(): void {
    this.leaveService.getAllPendingLeaves().subscribe((response) => {
      if (response.status === 'success') {
        this.leaves = response.allLeavesApplication;
      }
    });
  }

  onStatusChange(leaveId: string, status: string): void {
    this.leaveForm.get('selectedLeaveId')?.setValue(leaveId);
    this.leaveForm.get('selectedStatus')?.setValue(status);
  }

  submitAction(): void {
    const selectedLeave = this.leaves.find(leave => leave._id === this.leaveForm.get('selectedLeaveId')?.value);

    if (!selectedLeave) return;

    const actionData = {
      leaveId: this.leaveForm.get('selectedLeaveId')?.value,
      approve: this.leaveForm.get('selectedStatus')?.value,
      teacherId: selectedLeave.createdBy, // Get the teacherId from the selected leave
      message: "Enjoy your day champ", // Custom message
    };

    this.leaveService.postActionOnPendingLeaves(actionData).subscribe((response) => {
      if (response.status === 'success') {
        this.toastr.success(response.msg);
        this.getPendingLeaves(); // Refresh the leaves list
      } else {
        this.toastr.error('Failed to update status!');
      }
    });
  }

}
