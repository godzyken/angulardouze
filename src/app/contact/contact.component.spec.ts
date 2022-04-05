import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators , NgForm} from '@angular/forms';
import { baseUrl } from '../shared/baseUrl';
import { Observable, of } from 'rxjs';
import { HighlightDirective } from '../directives/highlight.directive';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule, MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ContactComponent } from './contact.component';
import { FeedbackService } from '../services/feedback.service';
import { Feedback } from '../shared/feedback';


describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let httpSpy: { get: jasmine.Spy };
  let http: HttpClient;
  let httpControl: HttpTestingController;
  let feedbackService: FeedbackService;

  beforeEach(async () => {
    const feedbackServiceStub: Pick<FeedbackService, 'getFeedBackIds'> = {
      getFeedBackIds() {
        return of(Feedback);
      }
    };
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([{path: 'contact', component: ContactComponent}]),
        MatGridListModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatSelectModule,
        MatSlideToggleModule,
      ],
      declarations: [ ContactComponent, HighlightDirective ],
      providers: [
        { provide: FeedbackService, useValue: feedbackServiceStub},
        { provide: 'BaseUrl', useValue: baseUrl},
        { provide: 'HttpClient', useValue: httpSpy },
        { provide: MatSliderHarness, useValue: {} },
      ],
    })
    .compileComponents();

      const feedbackService = TestBed.get(FeedbackService);
      http = TestBed.inject(HttpClient);
      httpControl = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;

    const statusToggleEl = fixture.debugElement.query(By.directive(MatSlideToggle));
    statusToggleEl.triggerEventHandler('change', { checked: true });

    component.feedbackForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      telnum: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      contacttype: new FormControl('', Validators.required),
      messages: new FormControl('', Validators.required),
      agree: new FormControl(false),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
