import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SaveFunctionalities } from 'src/app/helpers/localStorageHelper';

@Component({
  selector: 'app-edit-dialog-tasks',
  templateUrl: './edit-dialog-tasks.component.html',
  styleUrls: ['./edit-dialog-tasks.component.scss']
})
export class EditDialogTasksComponent {
  editedTask: any;
  newTaskName = ''
  loadProjects: any = [];

  constructor(
    public dialogRef: MatDialogRef<EditDialogTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const storedData = localStorage.getItem('functionalities');
    this.newTaskName = data.name
    if (storedData) {
      this.loadProjects = JSON.parse(storedData);
    }
    console.log(data)
  }

  updateTask() {
    const functionalities = this.loadProjects.filter((fun: any) => fun.functionalityID === this.data.functionality);
    const functionality = functionalities[0];
    const tasks = functionality.tasks;
    
    const taskIndex = tasks.findIndex((t: any) => t.taskID === this.data.task);
    if (taskIndex !== -1) {
      tasks[taskIndex].name = this.newTaskName;
    }

    SaveFunctionalities(this.loadProjects)
    location.reload();
  }

  ngOnInit(): void {
    const functionalitiesList = this.loadProjects.filter((fun: any) => fun.functionalityID === this.data.functionality);
    const editTaskName = functionalitiesList[0].tasks
    const selectedTask = editTaskName.filter((t: any) => t.taskID === this.data.task);
    this.newTaskName = selectedTask[0].name
    console.log(selectedTask)
  }
}