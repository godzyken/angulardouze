import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { visibility, flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {

  dish?:Dish;
  dishErrMess?:string;
  promotion?:Promotion;
  promotionErrMess?:string;
  leader?:Leader;
  leaderErrMess?:string;
  visibility = 'shown';

  constructor(
  private dishService: DishService,
  private promotionService: PromotionService,
  private leaderService: LeaderService,
  private location: Location,
  private route: ActivatedRoute,
  @Inject('BaseUrl') public BaseUrl: string
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params: Params) => {
        this.visibility = 'hidden';
        return this.dishService.getFeaturedDish();
      }))
      .subscribe(dish => {
        this.dish = dish;
        this.visibility = "shown";
      },
        errmess => this.dishErrMess = <any>errmess
    );

    this.route.params
      .pipe(switchMap((params: Params) => {
        this.visibility = 'hidden';
        return this.leaderService.getFeaturedLeader();
      }))
      .subscribe(leader => {
        this.leader = leader;
        this.visibility = "shown";
      },
        errmess => this.leaderErrMess = <any>errmess
    );

    this.route.params
      .pipe(switchMap((params: Params) => {
        this.visibility = 'hidden';
        return this.promotionService.getFeaturedPromotion();
      }))
      .subscribe(promotion => {
        this.promotion = promotion;
        this.visibility = "shown";
      },
        errmess => this.promotionErrMess = <any>errmess
    );
  }

}
