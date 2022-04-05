import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login.component';
import { MatTestDialogOpenerModule } from '@angular/material/dialog/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MatTestDialogOpenerModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: MatTestDialogOpenerModule, useValue: {} },
        { provide: MatDialog, useValue: dialog},
        { provide: MatDialogRef, useValue: dialogRef},
      ],
    })
    .compileComponents();

    dialog = TestBed.inject(MatDialog);
    dialogRef = TestBed.inject(MatDialogRef);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
