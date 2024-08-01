import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserComponent } from './admin/dashboard/user/user.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
// import { AuthGuard } from './guard/auth.guard';
import { EdituserFormComponent } from './edituser-form/edituser-form.component';
import { AllteachersComponent } from './admin/dashboard/allteachers/allteachers.component';
import { EditteacherdeatilsComponent } from './admin/editteacherdeatils/editteacherdeatils.component';
import { CreatebatchComponent } from './admin/dashboard/createbatch/createbatch.component';
import { MarkattendanceComponent } from './admin/dashboard/markattendance/markattendance.component';
import { EventlistComponent } from './admin/dashboard/eventlist/eventlist.component';
import { AdmineventComponent } from './admin/dashboard/adminevent/adminevent.component';
import { TeachertaskComponent } from './admin/dashboard/teachertask/teachertask.component';
import { AllstudentsComponent } from './admin/dashboard/allstudents/allstudents.component';
import { EditstudentdetailsComponent } from './admin/dashboard/editstudentdetails/editstudentdetails.component';
import { CreatestudentbatchComponent } from './admin/dashboard/createstudentbatch/createstudentbatch.component';
import { AuthGuard } from './guard/auth.guard';
import { UpdateteacherComponent } from './admin/dashboard/updateteacher/updateteacher.component';
import { CoursesAdminComponent } from './admin/dashboard/courses-admin/courses-admin.component';
import { CoursesForstudentsComponent } from './admin/dashboard/courses-forstudents/courses-forstudents.component';
import { CreatehomeworkAdminComponent } from './admin/dashboard/createhomework-admin/createhomework-admin.component';
import { PaymentbyAdminComponent } from './admin/dashboard/paymentby-admin/paymentby-admin.component';
import { GethomeworkBystudentComponent } from './admin/dashboard/gethomework-bystudent/gethomework-bystudent.component';
import { LeaverequestTeacherComponent } from './admin/dashboard/leaverequest-teacher/leaverequest-teacher.component';
import { PendingleavesAdminComponent } from './admin/dashboard/pendingleaves-admin/pendingleaves-admin.component';
import { ReportgenofStudentComponent } from './admin/dashboard/reportgenof-student/reportgenof-student.component';
import { TeacherratingAdminComponent } from './admin/dashboard/teacherrating-admin/teacherrating-admin.component';
import { TaskmngtAdminComponent } from './admin/dashboard/taskmngt-admin/taskmngt-admin.component';
import { AcountinfoComponent } from './admin/dashboard/acountinfo/acountinfo.component';
import { CreatenotificationAdminComponent } from './admin/dashboard/createnotification-admin/createnotification-admin.component';

const routes: Routes = [
  {
    // canActivate: [AuthGuard],
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UserComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'list_of_teachers', component: AllteachersComponent },
      { path: 'list_of_students', component: AllstudentsComponent },
      { path: 'list_of_events', component: EventlistComponent },
      { path: 'seeall_pendingLeaves', component: PendingleavesAdminComponent },
      {
        path: 'get_homeworkfor_students',
        component: GethomeworkBystudentComponent,
      },
      { path: 'create_teacher_batch', component: CreatebatchComponent },
      { path: 'create_student_batch', component: CreatestudentbatchComponent },
      {
        path: 'create_coursesFor_students',
        component: CoursesAdminComponent,
      },
      {
        path: 'courses_for_students',
        component: CoursesForstudentsComponent,
      },
      {
        path: 'seeAll_payments',
        component: PaymentbyAdminComponent,
      },
      { path: 'add_new_event', component: AdmineventComponent },
      { path: 'add_new_todays_task', component: TeachertaskComponent },
      { path: 'add_request_for_leave', component: LeaverequestTeacherComponent },
      { path: 'mark_attendance_teacher', component: MarkattendanceComponent },
      { path: 'users/:id/edit', component: EdituserFormComponent },
      {
        path: 'edit_teacher_details/:id',
        component: UpdateteacherComponent,
      },
      {
        path: 'edit_student_details/:id',
        component: EditstudentdetailsComponent,
      },
      {
        path: 'add_new_teacher',
        component: EditteacherdeatilsComponent,
      },
      {
        path: 'createmessage_teacher_batch',
        component: CreatenotificationAdminComponent,
      },
      {
        path: 'add_new_student',
        component: EditstudentdetailsComponent,
      },
      {
        path: 'create_homeworkFor_students',
        component: CreatehomeworkAdminComponent,
      },
      {
        path: 'generate_report',
        component: ReportgenofStudentComponent,
      },
      {
        path: 'teacher_appraisal',
        component: TeacherratingAdminComponent,
      },
      {
        path: 'task_management',
        component: TaskmngtAdminComponent,
      },
      {
        path: 'account_information',
        component: AcountinfoComponent,
      },
    ],
  },

  { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
