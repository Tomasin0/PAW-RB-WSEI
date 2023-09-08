import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDialogFunctionalitiesComponent } from './add-dialog-functionalities.component';

describe('AddDialogFunctionalitiesComponent', () => {
  let component: AddDialogFunctionalitiesComponent;
  let fixture: ComponentFixture<AddDialogFunctionalitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDialogFunctionalitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDialogFunctionalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
