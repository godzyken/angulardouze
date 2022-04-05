import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { baseUrl } from '../shared/baseUrl';
import { Observable, of } from 'rxjs';
import { HighlightDirective } from '../directives/highlight.directive';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { DishDetailsComponent } from './dish-details.component';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators , NgForm} from '@angular/forms';


describe('DishDetailsComponent', () => {
  let component: DishDetailsComponent;
  let fixture: ComponentFixture<DishDetailsComponent>;
  let httpSpy: { get: jasmine.Spy };
  let http: HttpClient;
  let httpControl: HttpTestingController;
  let dishService: DishService;

  beforeEach(async () => {
    const dishServiceStub: Pick<DishService, 'getDishIds'> = {
      getDishIds() {
        return of(Dish);
      }
    };
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([{path: 'dish-details', component: DishDetailsComponent}]),
        MatGridListModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ DishDetailsComponent, HighlightDirective ],
      providers: [
        { provide: DishService, useValue: dishServiceStub},
        { provide: 'BaseUrl', useValue: baseUrl},
        { provide: 'HttpClient', useValue: httpSpy }
      ],
    })
    .compileComponents();

    const dishService = TestBed.get(DishService);
    http = TestBed.inject(HttpClient);
    httpControl = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishDetailsComponent);
    component = fixture.componentInstance;
    component.commentForm = new FormGroup({
      author: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
      rating: new FormControl(0),
      date: new FormControl(''),
    });
    fixture.detectChanges();
  });


  it('should create a form using formbuilder', () => {
    expect(component.commentForm instanceof FormGroup).toBeTruthy();
  });
});
