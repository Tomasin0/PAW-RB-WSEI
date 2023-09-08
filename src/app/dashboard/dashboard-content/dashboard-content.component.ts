import { Component, OnInit } from '@angular/core';
import { projectDetails } from './project-details';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogTasksComponent } from './add-dialog-tasks/add-dialog-tasks.component';
import { EditDialogTasksComponent } from './edit-dialog-tasks/edit-dialog-tasks.component';
import { AddDialogFunctionalitiesComponent } from './add-dialog-functionalities/add-dialog-functionalities.component';
import { EditDialogFunctionalitiesComponent } from './edit-dialog-functionalities/edit-dialog-functionalities.component';
import { functionality } from 'src/app/models/functionality-model';
import { SaveFunctionalities } from 'src/app/helpers/localStorageHelper';
import { task } from 'src/app/models/task-model';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss'],
})

export class DashboardContentComponent  implements OnInit{

  enums: string[] =[]

  
  ToDo: any = localStorage.getItem('ToDo')
  Done: any = localStorage.getItem('Done')
  Doing: any = localStorage.getItem('Doing')

  projectList = projectDetails;
  loadProjects: any = {};

  constructor(public dialog: MatDialog) {
    const storedData = localStorage.getItem('functionalities');
    if (storedData) {
      this.loadProjects = JSON.parse(storedData);
    }
  }
  
  ngOnInit(): void {
    this.enums.push(this.ToDo);
    this.enums.push(this.Done);
    this.enums.push(this.Doing);
  
    for (const functionality of this.loadProjects) {
      for (const task of functionality.tasks) {
        const taskState = localStorage.getItem(task.taskID.toString());
        if (taskState) {
          task.state = taskState;
        }
        if (functionality.tasks.every((task: any) => task.state === 'Done')) {
          functionality.state = "Done"
        } else {
          functionality.state = "Doing"
        }
      }
    }
  }

  saveToLocal(option:any, task: any)
  {
    task.state = option.value
    SaveFunctionalities(this.loadProjects)
    location.reload();
  }

  openAddDialogTasks(id: number) {
    const dialogRef = this.dialog.open(AddDialogTasksComponent, {
      data: { id: id },
    });
  }

  openEditDialogTasks(functionalityId: number, taskId: number) {
    this.dialog.open(EditDialogTasksComponent, {
      data: {
        functionality: functionalityId,
        task: taskId
      }
    });
  }  

  openAddDialogFunctionalities() {
    this.dialog.open(AddDialogFunctionalitiesComponent);
  }

  openEditDialogFunctionalities(functionality: any) {
    console.log(functionality)
    this.dialog.open(EditDialogFunctionalitiesComponent, {
      data: functionality
    });
    
  }

  deleteFunctionality(id: any) {
    const deleteFunctionallity = this.loadProjects.filter(
      (func: functionality) => func.functionalityID !== id
    );

    SaveFunctionalities(deleteFunctionallity);
    location.reload();
  }

  deleteTask(selectedFunctionalityId: number, taskId: number) {
    const selectedFunctionalityIndex = this.loadProjects.findIndex(
      (project: any) => project.functionalityID === selectedFunctionalityId
    );
    if (selectedFunctionalityIndex !== -1) {
      const selectedFunctionality =
        this.loadProjects[selectedFunctionalityIndex];
      const filteredTasks = selectedFunctionality.tasks.filter(
        (task: any) => task.taskID !== taskId
      );
      selectedFunctionality.tasks = filteredTasks;
      this.loadProjects[selectedFunctionalityIndex] = selectedFunctionality;
      SaveFunctionalities(this.loadProjects);
    }
    location.reload();
  }

  changeState() {
  
  }
}

