import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { isFormArray } from '@angular/forms';
import * as pluginDataLables from 'chartjs-plugin-datalabels';
import { ServiceService } from 'src/app/shared/service.service';
import { result } from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  barChartType: any;
  chartData: any;
  businessData: any;
  data: any;

  batches: any[] = [];
  presenceData: any = null;
  selectedBatchId: string | null = null;

  constructor(private service: ServiceService) {}

  isLoading = true;

  public chart: Chart | undefined;
  ngOnInit(): void {
    // this.allCountBusiness();
    // this.getChartData();
    // this.RenderChart();
    this.fetchTeacherBatches();
  }

  fetchTeacherBatches() {
    console.log('fetch data');

    this.service.getAllTBatchNames().subscribe(
      (data) => {
        console.log('ALL Batches', data);
        this.batches = data.batches; // Assuming 'batches' is the correct property name in the response
      },
      (error) => {
        console.error('Error fetching batch names', error);
      }
    );
  }

  // selectBatch(batchId: string) {
  //   this.selectedBatchId = batchId;
  //   this.fetchPresenceData(batchId);
  // }

  selectBatch(batchId: string) {
    this.selectedBatchId = batchId;
    if (batchId) {
      this.service.getTodaysPresentyData(batchId).subscribe({
        next: (response) => {
          console.log('Getting getTodaysPresentyData', response.data);
          this.presenceData = response.data; // Set the presenceData array to the data array from the response
        },
        error: (error) => {
          console.error('Error fetching presence data', error);
        },
      });
    } else {
      this.presenceData = null; // Clear the presenceData if no batch is selected
    }
  }
  // fetchPresenceData(batchId: string) {
  //   this.service.getTodaysPresentyData(batchId).subscribe(
  //     (data: any) => {
  //       console.log('Getting getTodaysPresentyData', data);

  //       this.presenceData = data;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching presence data', error);
  //     }
  //   );
  // }

  // RenderChart() {
  //   const myChart = new Chart('canvas', {
  //     type: 'bar',
  //     data: {
  //       labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
  //       datasets: [
  //         {
  //           label: '# of Last week Joinings',
  //           data: [10, 14, 5, 4, 6, 17, 7],
  //           backgroundColor: ['rgb(134,142,150)'],
  //           borderColor: ['rgba(238,238,238, 1)'],
  //           borderWidth: 1,
  //         },
  //         {
  //           label: '# of this week Joinings',
  //           data: [12, 19, 3, 5, 2, 3, 9],
  //           backgroundColor: ['rgb(7,157,243)'],
  //           borderColor: ['rgba(54, 162, 235, 1)'],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       maintainAspectRatio: false,
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   })
  // }

  allCountBusiness() {
    this.service.getAllCountBusiness().subscribe({
      next: (res: any) => {
        console.log(res);
        this.data = res.data;
        this.isLoading = false;
      },
      error: (err: any) => {
        alert(err);
      },
    });
  }

  getCurrentDay(): string {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDate = new Date();
    return days[currentDate.getDay()];
  }

  rearrangeDays(currentDay: string): string[] {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDayIndex = days.indexOf(currentDay);
    const rearrangedDays = [
      ...days.slice(currentDayIndex),
      ...days.slice(0, currentDayIndex),
    ];
    return rearrangedDays;
  }

  rearrangeData(data: any, currentDay: string): number[] {
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const currentDayIndex = days.indexOf(currentDay);
    const rearrangedData = [
      ...Object.values(data).slice(currentDayIndex),
      ...Object.values(data).slice(0, currentDayIndex),
    ];
    return rearrangedData as number[];
  }

  getChartData(): void {
    this.service.getChartInfo().subscribe((res) => {
      this.chartData = res.data;
      // console.log("chart data", this.data);
      this.RenderChart();
    });
  }

  RenderChart(): void {
    const currentDay = this.getCurrentDay();
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    // const ctx = canvas.getContext('2d');

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.rearrangeDays(currentDay), // ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        datasets: [
          {
            label: 'Past Week Records',
            data: this.rearrangeData(
              this.chartData.pastWeekRecords,
              currentDay
            ),
            backgroundColor: ['rgb(134,142,150)'],
            borderColor: ['rgba(238,238,238, 1)'],
            borderWidth: 1,
          },
          {
            label: 'Current Week Records',
            data: this.rearrangeData(
              this.chartData.currentWeekRecords,
              currentDay
            ),
            backgroundColor: ['rgb(7,157,243)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // trialcount: number = 0;
  // activecount: number = 0;
  // expiredcount: number = 0;
  // allcount: number = 0;

  // trialcountstop: any = setInterval(() => {
  //   this.trialcount++;

  //   if (this.trialcount == 7170) {
  //     clearInterval(this.trialcountstop);
  //   }
  // }, 1);

  // activecountstop: any = setInterval(() => {
  //   this.activecount++;

  //   if (this.trialcount == 452) {
  //     clearInterval(this.activecountstop);
  //   }
  // }, 1);

  // expiredcountstop: any = setInterval(() => {
  //   this.expiredcount++;

  //   if (this.expiredcount == 7512) {
  //     clearInterval(this.expiredcountstop);
  //   }
  // }, 1);

  // allcountstop: any = setInterval(() => {
  //   this.allcount++;

  //   if (this.allcount == 7622) {
  //     clearInterval(this.allcountstop);
  //   }
  // }, 1);
}
