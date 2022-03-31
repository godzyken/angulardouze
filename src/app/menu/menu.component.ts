import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

  dishes?: Dish[];
  errorMessage?: string;

  selectedDish?: Dish;

  constructor(
    private dishService: DishService,
    @Inject('BaseUrl') public BaseUrl: string
  ) { }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe(
      (dishes) => this.dishes = dishes,
      errmess => this.errorMessage = <any>errmess
    );
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
