import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';
import { Observable, of } from 'rxjs';
import { HighlightDirective } from '../directives/highlight.directive';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';


describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let httpSpy: { get: jasmine.Spy };
  let http: HttpClient;
  let httpControl: HttpTestingController;
  let dishService: DishService;

  beforeEach(async () => {
    const dishServiceStub = {
      getDishes: function(): Observable<Dish[]> {
        return of(DISHES);
      }
    };
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([{path: 'menu', component: MenuComponent}]),
        MatGridListModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
      ],
      declarations: [ MenuComponent, HighlightDirective ],
      providers: [
        { provide: DishService, useValue: dishServiceStub },
        { provide: 'BaseUrl', useValue: baseUrl },
        { provide: 'HttpClient', useValue: httpSpy },
      ],

    })
    .compileComponents();

    const dishService = TestBed.get(DishService);
    http = TestBed.inject(HttpClient);
    httpControl = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;

    const expanded = fixture.debugElement.query(By.directive(HighlightDirective));
    expanded?.triggerEventHandler(('Expanded'), { checked: true });
    //component.triggerEventHandler('expanded', null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  it('service dish should be run', () => {
    expect(dishService).toEqual(dishService);
    expect(component?.dishes![1]?.name).toBe('Zucchipakoda');
    expect(component?.dishes![3]?.featured).toBeFalsy();
  });

  it('dishes items should be 4', () => {
    expect(component?.dishes?.length).toBe(4);
    expect(component?.dishes![1]?.name).toBe('Zucchipakoda');
    expect(component?.dishes![3]?.featured).toBeFalsy();
  });

  it('Should use dishes in the templplate', () => {
    fixture.detectChanges();

    let de: DebugElement;
    let el: HTMLElement;

    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;

    const expanded = fixture.debugElement.query(By.directive(HighlightDirective));
    expanded?.triggerEventHandler(('Expanded'), { checked: true });

    expect(el.textContent).toContain(DISHES[0].name);
  });
});
