import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { LeaderDetailsComponent } from './leader-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { baseUrl } from '../shared/baseUrl';
import { Observable, of } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HighlightDirective } from '../directives/highlight.directive';


describe('LeaderDetailsComponent', () => {
  let component: LeaderDetailsComponent;
  let fixture: ComponentFixture<LeaderDetailsComponent>;
  let httpSpy: { get: jasmine.Spy };
  let http: HttpClient;
  let httpControl: HttpTestingController;
  let leaderService: LeaderService;

  beforeEach(async () => {
    const leaderServiceStub: Pick<LeaderService, 'getLeadIds'> = {
      getLeadIds() {
        return of(Leader);
      }
    };
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([{path: 'leader-details', component: LeaderDetailsComponent}]),
        MatGridListModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
      ],
      declarations: [ LeaderDetailsComponent, HighlightDirective ],
      providers: [
        { provide: LeaderService, useValue: leaderServiceStub},
        { provide: 'BaseUrl', useValue: baseUrl},
        { provide: 'HttpClient', useValue: httpSpy }
      ],
    })
    .compileComponents();

    const leaderService = TestBed.get(LeaderService);
    http = TestBed.inject(HttpClient);
    httpControl = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
