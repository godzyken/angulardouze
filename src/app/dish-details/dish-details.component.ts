import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Dish } from '../shared/dish';

const DISH = {
  id: '0',
  name: 'Uthappizza',
  image: '/assets/images/uthappizza.png',
  category: 'mains',
  featured: true,
  label: 'Hot',
  price: '4.99',
  // tslint:disable-next-line:max-line-length
  description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
  comments: [
    {
       rating: 5,
       comment: 'Imagine tes papilles, vivre une confusion!',
       author: 'John Doeuf',
       date: '2022-03-25T15:15:15.556094Z'
    },
    {
       rating: 5,
       comment: 'Point rescouss avant le repas chez la bel doch',
       author: 'Sully VanVite',
       date: '2022-03-25T17:57:28.556094Z'
    },
    {
       rating: 5,
       comment: 'Sa good bon!!',
       author: 'Michael Keal',
       date: '2022-03-26T12:27:07.556094Z'
    },
    {
       rating: 5,
       comment: 'Bide explosé, ça mérite son dû!',
       author: 'Léo Zeproot',
       date: '2022-03-27T21:57:00.556094Z'
    },
  ]
};

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DishDetailsComponent implements OnInit {

  dish = DISH;

  constructor() { }

  ngOnInit(): void {
  }

}
