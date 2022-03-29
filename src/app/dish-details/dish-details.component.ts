import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DishDetailsComponent implements OnInit {

  dish?: Dish;

  constructor(
  private dishService: DishService,
  private location: Location,
  private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.dishService.getDish(id).then((dish) => this.dish = dish);
  }

  goBack(): void {
    this.location.back();
  }
}
