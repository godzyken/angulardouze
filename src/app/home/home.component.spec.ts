import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home.component';
import { HighlightDirective } from '../directives/highlight.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { baseUrl } from '../shared/baseUrl';
import { Observable, of } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MatTestDialogOpenerModule } from '@angular/material/dialog/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpSpy: { get: jasmine.Spy };
  let http: HttpClient;
  let httpControl: HttpTestingController;
  let dishService: DishService;
  let promotionService: PromotionService;
  let leaderService: LeaderService;

  beforeEach(async () => {
    const dishServiceStub = {
      getDishes: function(): Observable<Dish[]> {
        return of(DISHES);
      }
    };

    const promotionServiceStub = {
      getPromotions: function(): Observable<Promotion[]> {
        return of(PROMOTIONS);
      }
    };

    const leaderServiceStub = {
      getLeaders: function(): Observable<Leader[]> {
        return of(LEADERS);
      }
    };

    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([{path: 'home', component: HomeComponent}]),
        MatGridListModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        MatTestDialogOpenerModule,
      ],
      declarations: [ HomeComponent, HighlightDirective ],
      providers: [
        { provide: DishService, useValue: dishServiceStub },
        { provide: PromotionService, useValue: promotionServiceStub },
        { provide: LeaderService, useValue: leaderServiceStub },
        { provide: 'BaseUrl', useValue: baseUrl },
        { provide: 'HttpClient', useValue: httpSpy },
      ],
    })
    .compileComponents();
    const dishService = TestBed.get(DishService);
    const promotionService = TestBed.get(PromotionService);
    const leaderService = TestBed.get(LeaderService);
    http = TestBed.inject(HttpClient);
    httpControl = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Dihes testing
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('services should be run', () => {
    expect(dishService).toEqual(dishService);
    expect(promotionService).toEqual(promotionService);
    expect(leaderService).toEqual(leaderService);
  });

  it('Should use dishes, promotions, leaders in the templplate', () => {
    fixture.detectChanges();

    let de: DebugElement;
    let el: HTMLElement;

    de = fixture.debugElement.query(By.css('h1'));
    el = de?.nativeElement;

    expect(el?.textContent).toContain(DISHES![0]?.name);
    expect(el?.textContent).toContain(PROMOTIONS![0]?.name);
    expect(el?.textContent).toContain(LEADERS![0]?.name);
  });

  // Promotion testing
  it('names should be found', () => {
    expect(component?.dish?.name
     ).toBeDefined();
    expect(component?.dish?.name).toBe('Zucchipakoda');

    expect(component?.promotion?.name).toBeDefined();
    expect(component?.promotion?.name).toBe('Weekend Grand NanNan');

    expect(component?.leader?.name).toBeDefined();
    expect(component?.leader?.name).toBe('Dhanasekaran Witherspoon');
  });

  // Leadership testing
  it('featured boolean value section should be false', () => {
    expect(component?.dish?.featured).toBeFalsy();
    expect(component?.promotion?.featured).toBeFalsy();
    expect(component?.leader?.featured).toBeFalsy();
  });

});
