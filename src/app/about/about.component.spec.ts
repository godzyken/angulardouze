import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { LEADERS } from '../shared/leaders';
import { baseUrl } from '../shared/baseUrl';
import { Observable, of } from 'rxjs';
import { HighlightDirective } from '../directives/highlight.directive';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let httpSpy: { get: jasmine.Spy };
  let http: HttpClient;
  let httpControl: HttpTestingController;
  let leaderService: LeaderService;

  beforeEach(async () => {
    const leaderServiceStub = {
      getLeaders : function(): Observable<Leader[]> {
        return of(LEADERS)
      }
    };
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([{path: 'about', component: AboutComponent}]),
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
      ],
      declarations: [ AboutComponent ],
      providers: [
        {provide: LeaderService, useValue: leaderServiceStub },
        {provide: 'BaseUrl', useValue: baseUrl },
        {provide: 'HttpClient', useValue: httpSpy },
      ],
    })
    .compileComponents();

    const leaderService = TestBed.get(LeaderService);
    http = TestBed.inject(HttpClient);
    httpControl = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('service leaders should be run', () => {
    expect(leaderService).toEqual(leaderService);
    expect(component.leaders![1].name).toBe('Dhanasekaran Witherspoon');
    expect(component.leaders![3].featured).toBeTruthy();
  });
});
