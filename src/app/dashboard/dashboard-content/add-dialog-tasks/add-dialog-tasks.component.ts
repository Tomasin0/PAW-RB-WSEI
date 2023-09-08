import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { task } from 'src/app/models/task-model';
import { SaveFunctionalities } from '../../../helpers/localStorageHelper';

@Component({
  selector: 'app-add-dialog-tasks',
  templateUrl: './add-dialog-tasks.component.html',
  styleUrls: ['./add-dialog-tasks.component.scss'],
})

export class AddDialogTasksComponent {

  loadProjects: any = [];
  nameOfTask = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    const storedData = localStorage.getItem('functionalities');
    if (storedData) {
      this.loadProjects = JSON.parse(storedData);
    }
  }

  addTask() {
    if (this.nameOfTask.trim() === '') {
      return;
    }

    const functionalityTask = this.loadProjects.find(
      (project: any) => project.functionalityID === this.data.id
    );

    if (functionalityTask) {
      const newTask: task = {
        taskID: Date.now(),
        name: this.nameOfTask,
        state: 'To do',
      };

      functionalityTask.tasks.push(newTask);
      if (functionalityTask.tasks.length > 0) {
        functionalityTask.state = "Doing"
      }
      console.log(functionalityTask)
      SaveFunctionalities(this.loadProjects);
      this.nameOfTask = '';

      const updatedData = JSON.stringify(this.loadProjects);
      localStorage.setItem('functionalities', updatedData);
      console.log(newTask)
      location.reload();
    }
  }

  ngOnInit() {}
}
