import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Business, appConfig, Subscription } from '../models';
import { environment } from 'enviroment';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  //set base url

  private url = environment.apiUrl;
  private createBatchUrl = `${this.url}/admin/createTeachersbatch`;

  private addTeacherUrl = `${this.url}/admin/createTeachers`;

  private updateTeacherUrl = `${this.url}/admin/updateTeacher`;

  private markPresentUrl = `${this.url}/teacher/markPresent`;

  private adminEventUrl = `${this.url}/admin/todaysEvent`;

  private teacherTaskUrl = `${this.url}/teacher/submitTodaysTask`;

  private getAllEventsUrl = `${this.url}/admin/getAllEvents`;

  private addStudentUrl = `${this.url}/admin/createStudent`;

  private createStudentBatchUrl = `${this.url}/admin/createStudentbatch`;

  private getAllBatchNamesUrl = `${this.url}/admin/getAllBatchNames`;

  private getTodaysPresentyDataUrl = `${this.url}/admin/getTodaysPresentyData`;

  private getAllStudentBatchNamesUrl = `${this.url}/admin/getAllStudentsBatchNames`;

  private getAttendanceUrl = `${this.url}/admin/getPresentyData`;

  private batchUrl = `${this.url}/admin/`;

  private baseUrl = `${this.url}/admin`;

  private deleteTeacherUrl = `${this.url}/admin/deleteTeacher`;

  private createCoursesUrl = `${this.url}/admin/createCourses`;

  private getAllCoursesUrl = `${this.url}/student/getAllCourses`;

  private buyCourseUrl = `${this.url}/student/buyCourse`;

  private createHomeworkUrl = `${this.url}/admin/createHomework`;

  private uploadQrUrl = `${this.url}/admin/uploadQrForPayment`;

  private getAllPaymentsUrl = `${this.url}/admin/getAllPendingSubscription`;

  private approvePaymentUrl = `${this.url}/admin/subscribeStudentToCourse`;

  private getHomeworktUrl = `${this.url}/student/getMyHomework`;

  private getAllStudentsBatchUrl = `${this.url}/admin/getAllStudentsBatchNames`;

  private studentsByBatchIdUrl = `${this.url}/admin/getAllStudentsList`;

  private markStudentAttendanceUrl = `${this.url}/admin/markTodaysStudentPresenty`;

  private postLeaveRequestUrl = `${this.url}/teacher/requestForLeave`;

  private getAllPendingLeavesUrl = `${this.url}/admin/listOfPendingLeaves`;

  private postActionOnPendingLeavesUrl = `${this.url}/admin/actionOnPendingLeaves`;

  private createNotificationTacherBatchUrl = `${this.url}/admin/createNotification/batch`;

  private getTeacherByBatchIdUrl = `${this.url}/admin/getAllTeachersShortInfo`;

  private createTeacherNotificationUrl = `${this.url}/admin/createNotification/teacher`;

  private getNotificationUrl = `${this.url}/teacher/getAllNotification`;
  // private getHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  //   return new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  // }

  constructor(private http: HttpClient) { }

  //UserDetails API
  getAllUserDetails(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/users`);
    // return this.http.get<any>("/api/UserDetails/");
  }

  //Teachers Details
  getAllTeacherDetails(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/allTeachersData`);
    // return this.http.get<any>("/api/UserDetails/");
  }

  // Add new teacher
  // addNewTeacher(teacher: any): Observable<any> {
  //   return this.http.post<any>(`http://localhost:3000/addTeacher`, teacher);
  // }

  //Add Teacher Batch
  createBatch(batchData: {
    batchName: string;
    batchAddress: string;
  }): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(this.createBatchUrl, batchData, { headers });
  }

  //Add student batch
  addStudentBatch(batchData: {
    batchName: string;
    batchAddress: string;
  }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.createStudentBatchUrl, batchData, {
      headers,
    });
  }

  //Get getTodaysPresentyData
  getTodaysPresentyData(batchId: string): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.getTodaysPresentyDataUrl}/${batchId}`, {
      headers,
    });
  }

  //GET all Teachers batces

  getAllBatchNames(): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(this.getAllBatchNamesUrl, { headers });
  }

  getAllTBatchNames(): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(this.getAllBatchNamesUrl, { headers });
  }

  //GET all Teachers batces
  getAllStudenBatchNames(): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(this.getAllStudentBatchNamesUrl, { headers });
  }

  //Get all batches details

  getBatch(batchId: string): Observable<any> {
    const url = `${this.batchUrl}getBatch/${batchId}`;
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(url, { headers });
  }

  //Get teache by ID
  getTeacherById(teacherId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.baseUrl}/getDataOfTeacher/${teacherId}`, {
      headers,
    });
  }

  //GET techers attendance sheet by id
  getPresentyData(teacherId: string, month: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(
      `${this.getAttendanceUrl}/${teacherId}/${month}`,
      { headers }
    );
  }

  //Add teacher
  createTeacher(teacherData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<any>(`${this.addTeacherUrl}`, teacherData, {
      headers,
    });
  }

  //Edit teacher
  updateTeacher(id: string, teacherData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.patch<any>(`${this.updateTeacherUrl}`, teacherData, {
      headers,
    });
  }

  //Delete teacher
  deleteTeacher(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.delete<any>(`${this.deleteTeacherUrl}/${id}`, {
      headers,
    });
  }

  //Mark attendance
  markAttendance(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(this.markPresentUrl, formData, { headers });
  }

  //Add teacher task
  addTask(formData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(this.teacherTaskUrl, formData, { headers });
  }

  //ADD Event

  getEventById(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.adminEventUrl}/${id}`, { headers });
  }

  createEvent(eventData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.adminEventUrl, eventData, { headers });
  }

  updateEvent(id: string, eventData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(`${this.adminEventUrl}/${id}`, eventData, { headers });
  }

  // get all event
  getAllEvents(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.getAllEventsUrl, { headers });
  }

  //createCourses for student
  createCourses(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.createCoursesUrl, formData, { headers });
  }

  //get all courses for students
  getAllCourses(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.getAllCoursesUrl, { headers });
  }

  //Post all data for buying course for student
  buyCourse(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.buyCourseUrl, formData, { headers });
  }

  //Add student
  addStudent(studentData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.addStudentUrl, studentData, { headers });
  }

  updateStudent(studentId: string, studentData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(
      `${this.addStudentUrl}/${studentId}`,
      studentData,
      {
        headers,
      }
    );
  }

  //add homework by admin for student
  createHomework(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(this.createHomeworkUrl, formData, { headers });
  }

  //upload QR for payments
  uploadQR(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(this.uploadQrUrl, formData, { headers });
  }

  // Get all payments
  getAllPayments(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<any>(this.getAllPaymentsUrl, { headers });
  }

  //Post approve course
  approveCourse(paymentId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(
      `${this.approvePaymentUrl}/${paymentId}`,
      {},
      { headers }
    );
  }

  //Get homework for students
  getHomeworkByStudent(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.getHomeworktUrl}`, { headers });
  }

  //Get all students batch
  getAllStudentsBatch(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.getAllStudentsBatchUrl}`, { headers });
  }

  //Get student by batch Id
  getStudentByBatchId(batchId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.studentsByBatchIdUrl}/${batchId}`, {
      headers,
    });
  }

  //mark attendance of students
  markStudentAttendance(presentyData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.markStudentAttendanceUrl}`, presentyData, {
      headers,
    });
  }

  //post a request for leave
  postLeaveRequest(leaveData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.postLeaveRequestUrl}`, leaveData, { headers });
  }

  //Get all pending list of leaves for Admin
  getAllPendingLeaves(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.getAllPendingLeavesUrl}`, { headers });
  }

  //Post action on pending leaves
  postActionOnPendingLeaves(actionData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.postActionOnPendingLeavesUrl}`, actionData, {
      headers
    });
  }

  // Create notification for a teacher batch
  createNotification(batchId: string, message: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.createNotificationTacherBatchUrl}/${batchId}`, message, { headers });
  }

  // create notification for techer
  createTeacherNotification(teacherId: string, notificationData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.createTeacherNotificationUrl}/${teacherId}`, notificationData, { headers });
  }

  //get techer by batch id
  getTeacherByBatchId(batchId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.getTeacherByBatchIdUrl}/${batchId}`, { headers });
  }

  //Get all notification for techer
  getNotifications(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.getNotificationUrl, { headers });
  }

  getAllCountBusiness(): Observable<any> {
    return this.http.get<any>('api/AdminHome/');
  }

  getChartInfo(): Observable<any> {
    // return this.http.get<any>('api/AdminHome/');
    return this.http.get<any>('http://localhost:3000/joiningsData');
  }

  //Update Data
  updateUsers(id: number, data: any): Observable<any> {
    return this.http.get('http://localhost:3000/users/$(id), user');
  }
}
