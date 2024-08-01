import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './admin/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserComponent } from './admin/dashboard/user/user.component';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { EdituserFormComponent } from './edituser-form/edituser-form.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AllteachersComponent } from './admin/dashboard/allteachers/allteachers.component';
import { EditteacherdeatilsComponent } from './admin/editteacherdeatils/editteacherdeatils.component';
import { CreatebatchComponent } from './admin/dashboard/createbatch/createbatch.component';
import { MarkattendanceComponent } from './admin/dashboard/markattendance/markattendance.component';
import { AdmineventComponent } from './admin/dashboard/adminevent/adminevent.component';
import { EventlistComponent } from './admin/dashboard/eventlist/eventlist.component';
import { TeachertaskComponent } from './admin/dashboard/teachertask/teachertask.component';
import { AllstudentsComponent } from './admin/dashboard/allstudents/allstudents.component';
import { EditstudentdetailsComponent } from './admin/dashboard/editstudentdetails/editstudentdetails.component';
import { CreatestudentbatchComponent } from './admin/dashboard/createstudentbatch/createstudentbatch.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CoursesAdminComponent } from './admin/dashboard/courses-admin/courses-admin.component';
import { UpdateteacherComponent } from './admin/dashboard/updateteacher/updateteacher.component';
import { CoursesForstudentsComponent } from './admin/dashboard/courses-forstudents/courses-forstudents.component';
import { CreatehomeworkAdminComponent } from './admin/dashboard/createhomework-admin/createhomework-admin.component';
import { PaymentbyAdminComponent } from './admin/dashboard/paymentby-admin/paymentby-admin.component';
import { GethomeworkBystudentComponent } from './admin/dashboard/gethomework-bystudent/gethomework-bystudent.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LeaverequestTeacherComponent } from './admin/dashboard/leaverequest-teacher/leaverequest-teacher.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PendingleavesAdminComponent } from './admin/dashboard/pendingleaves-admin/pendingleaves-admin.component';
import { ReportgenofStudentComponent } from './admin/dashboard/reportgenof-student/reportgenof-student.component';
import { TeacherratingAdminComponent } from './admin/dashboard/teacherrating-admin/teacherrating-admin.component';
import { TaskmngtAdminComponent } from './admin/dashboard/taskmngt-admin/taskmngt-admin.component';
import { AcountinfoComponent } from './admin/dashboard/acountinfo/acountinfo.component';
import { CreatenotificationAdminComponent } from './admin/dashboard/createnotification-admin/createnotification-admin.component';
import { NotificationTeacherComponent } from './admin/dashboard/notification-teacher/notification-teacher.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    DashboardComponent,
    UserComponent,

    EdituserFormComponent,
    LoginComponent,
    RegisterComponent,
    AllteachersComponent,
    EditteacherdeatilsComponent,
    CreatebatchComponent,
    MarkattendanceComponent,
    AdmineventComponent,
    EventlistComponent,
    TeachertaskComponent,
    AllstudentsComponent,
    EditstudentdetailsComponent,
    CreatestudentbatchComponent,
    CoursesAdminComponent,
    UpdateteacherComponent,
    CoursesForstudentsComponent,
    CreatehomeworkAdminComponent,
    PaymentbyAdminComponent,
    GethomeworkBystudentComponent,
    LeaverequestTeacherComponent,
    PendingleavesAdminComponent,
    ReportgenofStudentComponent,
    TeacherratingAdminComponent,
    TaskmngtAdminComponent,
    AcountinfoComponent,
    CreatenotificationAdminComponent,
    NotificationTeacherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    MatSliderModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    NgChartsModule,
    HighchartsChartModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatDialogModule,
    NgbModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatTabsModule,
    MatListModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ToastrModule.forRoot(),
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
