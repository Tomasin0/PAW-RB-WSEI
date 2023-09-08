import { Component } from '@angular/core';
import { AddFunctionality } from '../../../helpers/localStorageHelper';
import { functionality } from 'src/app/models/functionality-model';

@Component({
  selector: 'app-add-dialog-functionalities',
  templateUrl: './add-dialog-functionalities.component.html',
  styleUrls: ['./add-dialog-functionalities.component.scss'],
})

export class AddDialogFunctionalitiesComponent {

  input!: string;
  data: functionality = { functionalityID: Date.now(), name: 'a', state: "ToDo", tasks: [] };
  functionallityName!: any;

  onAdd() {
    if (this.functionallityName.trim() === '') {
      return;
    }
    this.data.name = this.functionallityName;
    console.log(this.data)
    AddFunctionality(this.data);
    location.reload();
  }
}