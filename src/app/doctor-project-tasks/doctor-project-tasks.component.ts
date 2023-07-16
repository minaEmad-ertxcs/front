import { Component } from '@angular/core';
import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';
import { Modal } from 'bootstrap';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-doctor-project-tasks',
  templateUrl: './doctor-project-tasks.component.html',
  styleUrls: ['./doctor-project-tasks.component.css'],
})
export class DoctorProjectTasksComponent {
  token = localStorage.getItem('token');
  userRole: number = 2;
  project!: any;
  projectID!: number;
  doctor!: any;
  newTask!: any;
  tasks: any[] = [];
  events: any[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getMyProfile();
    this.route.params.subscribe((params) => {
      this.projectID = params['id'];
    });
    this.getTasks();

    this.http
      .get(`http://127.0.0.1:8000/api/project/${this.projectID}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.project = res;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getMyProfile() {
    this.http
      .get('http://127.0.0.1:8000/api/showMyProfileForDoctor', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.doctor = res;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  saveTask(task: any) {
    const newTaskForm = this.formBuilder.group({
      title: task.title,
      description: task.description,
      start: task.start,
      end: task.end,
      file: task.file,
      project_id: this.projectID,
      author: task.auther,
      type: task.type,
    });

    this.http
      .post('http://127.0.0.1:8000/api/createTask', newTaskForm.getRawValue(), {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  getTasks() {
    this.http
      .get(`http://127.0.0.1:8000/api/getTask/${this.projectID}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        $(document).ready(() => {
          const eventModal = $('#eventModal');
          const editModal = $('#editModal');
          const removeModal = $('#removeModal');
          const gradeModal = $('#gradeModal');
          const currentYear = moment().year();
          const today = moment().startOf('day');
          let calendarEvents = res;

          $('#calendar').fullCalendar({
            validRange: {
              start: moment(`${currentYear}-07-01`),
              end: moment(`${currentYear + 1}-07-30`).subtract(1, 'day'),
            },
            header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,agendaWeek,agendaDay',
            },
            buttonText: {
              prev: 'Prev',
              next: 'Next',
              today: 'Today',
            },

            selectable: this.userRole === 2 || this.userRole === 3,
            selectHelper: true,
            editable: this.userRole === 2 || this.userRole === 3,

            eventAllow: (dropInfo, draggedEvent) => {
              const eventStart = moment(draggedEvent.start);
              return eventStart >= today;
            },

            eventClick: (event) => {
              const start = event.start ? moment(event.start).format() : '';
              const end = event.end ? moment(event.end).format() : '';
              let eventDetails = `
              Task Title: ${event.title}<br>
              Description: ${event['description']}<br>
              Uploaded File:${
                event['uploadedFile'] ? event['uploadedFile'] : ''
              }<br>
              Start: ${start}<br>
              End: ${end}<br>
              Submission date: ${event['submission']}<br>
              Grade: ${event['grade'] ? event['grade'] : ''}<br>
              `;
              eventModal.find('.modal-title').text('Task Details');
              eventModal.find('.modal-body').html(eventDetails);

              eventModal.find('.modal-footer').html(`
                <button type="button" class="btn btn-sm btn-primary" data-action="addGrade">Add Grade</button>
                <button type="button" class="btn btn-sm btn-danger" data-action="remove">Remove</button>
                `);

              eventModal.find('[data-action="remove"]').on('click', () => {
                Modal.getOrCreateInstance(removeModal[0]).show();
                Modal.getOrCreateInstance(eventModal[0]).hide();
                removeModal.find('[data-action="confirm"]').on('click', () => {
                  $('#calendar').fullCalendar('removeEvents', event._id);
                  Modal.getOrCreateInstance(removeModal[0]).hide();
                  Modal.getOrCreateInstance(eventModal[0]).hide();
                });
              });

              eventModal.find('[data-action="addGrade"]').on('click', () => {
                const gradeEventTitle = gradeModal.find('#gradeEventTitle');
                gradeEventTitle.text(event.title);
                Modal.getOrCreateInstance(gradeModal[0]).show();
                Modal.getOrCreateInstance(eventModal[0]).hide();
              });

              gradeModal.find('[data-action="submitGrade"]').on('click', () => {
                const grade = gradeModal
                  .find('#gradeEventGrade')
                  .val() as string;
                event['grade'] = grade;

                var gradeForm = this.formBuilder.group({
                  id: event.id,
                  grade: grade,
                });

                this.http
                  .post(
                    `http://127.0.0.1:8000/api/saveGrade`,
                    gradeForm.getRawValue(),
                    {
                      headers: { Authorization: `Bearer ${this.token}` },
                      withCredentials: true,
                    }
                  )
                  .subscribe(
                    (res: any) => {
                      console.log(res);
                      location.reload();
                    },
                    (error: any) => {
                      console.log(error);
                    }
                  );

                $('#calendar').fullCalendar('updateEvent', event);
                Modal.getOrCreateInstance(gradeModal[0]).hide();
              });

              Modal.getOrCreateInstance(eventModal[0]).show();
            },

            select: (start, end) => {
              if (this.userRole !== 2 && this.userRole !== 3) {
                return;
              }
              const selectedStartDate = moment(start);
              if (selectedStartDate.isBefore(moment().startOf('day'))) {
                return;
              }
              // console.log('Range selected:', start, end);
              eventModal.find('.modal-title').text('Add Task');
              eventModal.find('.modal-body').html(`
                <div class="form-group">
                  <label for="eventTitle">Task Title:</label>
                  <input type="text" class="form-control" id="eventTitle">
                </div>
                <div class="form-group">
                  <label for="eventDescription">Description:</label>
                  <input type="text" class="form-control" id="eventDescription">
                </div>
              `);
              eventModal.find('.modal-footer').html(`
                <button type="button" class="btn btn-primary" data-action="save">Save</button>
              `);
              Modal.getOrCreateInstance(eventModal[0]).show();

              eventModal.find('[data-action="save"]').on('click', () => {
                const title = eventModal.find('#eventTitle').val() as string;
                const description = eventModal
                  .find('#eventDescription')
                  .val() as string;
                const file = $('#fileInput').prop('files')[0];
                if (title) {
                  const eventData = {
                    title: title,
                    description: description,
                    start: moment(start).format(),
                    end: moment(end).format(),
                    file: '',
                    projectID: this.projectID,
                    auther: this.doctor.email,
                    submission: '',
                    type: 'add',
                  };
                  $('#calendar').fullCalendar('renderEvent', eventData, true);
                  this.saveTask(eventData);
                  Modal.getOrCreateInstance(eventModal[0]).hide();
                }
              });
            },
            events: calendarEvents,
          });
        });
      });
  }

  submitGrade() {}
}
