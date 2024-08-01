import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss'],
})
export class EventlistComponent implements OnInit {
  events: any[] = [];

  constructor(
    private eventService: ServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(
      (response) => {
        console.log('Getting all Events', response.events);
        this.events = response.events;
      },
      (error) => {
        console.error('Error fetching events', error);
        this.toastr.error('Error fetching events', 'Error');
      }
    );
  }
}
