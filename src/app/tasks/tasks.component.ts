import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import * as moment from 'moment';
import { Modal } from 'bootstrap';
import { Model } from 'fullcalendar';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  userRole: string = 'ta'; // Set the user role here (doctor, ta, or student)

  ngOnInit() {
    this.initializeCalendar();
  }

  initializeCalendar() {
    $(document).ready(() => {

      const eventModal = $('#eventModal');
      const editModal = $('#editModal');
      const removeModal = $('#removeModal');
      const gradeModal = $('#gradeModal');
      const currentYear = moment().year(); // Get the current year

      $('#calendar').fullCalendar({
        defaultView: 'agendaWeek', // Set the default view to 'agendaWeek'
      validRange: {
        // Limit the valid range to the current year
        start: moment(`${currentYear}-07-01`),
        end: moment(`${currentYear + 1}-07-30`).subtract(1, 'day'), // Subtract 1 day to exclude the first day of the next year
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
        selectable: this.userRole === 'doctor' || this.userRole === 'ta',
        selectHelper: true,
        editable: this.userRole === 'doctor' || this.userRole === 'ta',
        eventClick: (event) => {
          const start = event.start ? moment(event.start).format() : '';
          const end = event.end ? moment(event.end).format() : '';
          let eventDetails = `
          Task Title: ${event.title}<br>
          Description: ${event['description']}<br>
          Uploaded File:${event['uploadedFile']}<br>
          Start: ${start}<br>
          End: ${end}<br>
          Submission date: ${event['submission']}<br>
          Grade: ${event['grade']}<br>
          File: ${event['file']}<br>
          `;
          eventModal.find('.modal-title').text('Task Details');
          eventModal.find('.modal-body').html(eventDetails);

          if (this.userRole === 'student') {
            eventModal.find('.modal-footer').html(`
              <button type="button" class="btn btn-sm btn-primary" data-action="addFile">Add File</button>
            `);
            eventModal.find('[data-action="addFile"]').on('click', () => {
              const fileUploadModal = $('#fileUploadModal');
              Modal.getOrCreateInstance(fileUploadModal[0]).show();
              Modal.getOrCreateInstance(eventModal[0]).hide();

              fileUploadModal
                .find('[data-action="submitFile"]')
                .on('click', () => {
                  const fileInput = $('#fileInput')[0] as HTMLInputElement;
                  const file = fileInput.files?.[0];

                  if (file) {
                    const submissionTime = moment().format(
                      'YYYY-MM-DD HH:mm:ss'
                    );
                    const fileName = file.name;
                    event['uploadedFile'] = fileName;
                    event['submission'] = submissionTime;
                    $('#calendar').fullCalendar('updateEvent', event);
                    Modal.getOrCreateInstance(fileUploadModal[0]).hide();
                  }
                });
            });
          } else if (this.userRole === 'doctor' || this.userRole === 'ta') {
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
              const grade = gradeModal.find('#gradeEventGrade').val() as string;
              event['grade'] = grade;
              $('#calendar').fullCalendar('updateEvent', event);
              Modal.getOrCreateInstance(gradeModal[0]).hide();
            });
          }

          Modal.getOrCreateInstance(eventModal[0]).show();
        },

        select: (start, end) => {
          if (this.userRole !== 'doctor' && this.userRole !== 'ta') {
            return;
          }
          //add task for doctor or ta
          console.log('Range selected:', start, end);
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
            <div class="form-group">
              <label for="fileInput">Choose File:</label>
              <input type="file" class="form-control-file" id="fileInput">
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
                start: start,
                end: end,
                description: description,
                file: file ? file.name : '', // Save the file name or an empty string
                submission: '',
              };
              $('#calendar').fullCalendar('renderEvent', eventData, true);
              Modal.getOrCreateInstance(eventModal[0]).hide();
            }
          });
        },
        events: [
          {
            title: 'Event 1',
            start: '2023-06-01',
            end: '2023-06-02',
            description: 'Event 1 Description',
            file: '',
            submission: '',
            grade: '',
            uploadedFile: '',
          },
          {
            title: 'Event 2',
            start: '2023-06-05',
            end: '2023-06-07',
            description: 'Event 2 Description',
            file: '',
            submission: '',
            grade: '',
            uploadedFile: '',
          },
        ],
      });
    });
  }
}
