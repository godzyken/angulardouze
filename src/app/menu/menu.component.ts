import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { visibility, flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand(),
  ],
})
export class MenuComponent implements OnInit {

  dishes?: Dish[];
  errorMessage?: string;

  selectedDish?: Dish;
  visibility = 'shown';

  constructor(
      private dishService: DishService,
      private location: Location,
      private route: ActivatedRoute,
    @Inject('BaseUrl') public BaseUrl: string
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params: Params) => {
        this.visibility = 'hidden';
        return this.dishService.getDishes();
      }))
      .subscribe(dishes => {
        this.dishes = dishes;
        this.visibility = "shown";
      },
        errmess => this.errorMessage = <any>errmess
      );
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
