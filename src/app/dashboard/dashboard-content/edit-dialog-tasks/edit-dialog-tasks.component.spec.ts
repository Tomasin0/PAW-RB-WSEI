import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogTasksComponent } from './edit-dialog-tasks.component';

describe('EditDialogTasksComponent', () => {
  let component: EditDialogTasksComponent;
  let fixture: ComponentFixture<EditDialogTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDialogTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDialogTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
