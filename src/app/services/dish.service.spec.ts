import { TestBed, async, inject} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DishService } from './dish.service';

describe('DishService', () => {
  let service: DishService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DishService],
    });
    service = TestBed.inject(DishService);
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(DishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should fetch dishes as an Observable`, async(inject([HttpTestingController, DishService],
    (httpClient: HttpTestingController, dishService: DishService) => {
      const dishesItem = [
         {
           id: '0',
           name: 'Uthappizza',
           image: 'images/uthappizza.png',
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
                comment: 'point rescous avant de rejoindre le repa de famille chez la bel doch',
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
           ],
         },
         {
           id: '1',
           name: 'Zucchipakoda',
           image: 'images/zucchipakoda.png',
           category: 'appetizer',
           featured: false,
           label: '',
           price: '1.99',
           description: 'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
           comments: [
             {
                rating: 3,
                comment: 'I bon I bon !!',
                author: 'Ehon Simm',
                date: '2022-04-05T16:00:00.556094Z'
             },
             {
                rating: 4,
                comment: 'feu au fion égal cbon!',
                author: 'Abuhu Porthan',
                date: '2022-05-25T13:37:38.556094Z'
             },
             {
                rating: 2,
                comment: 'It\'s your birthday, we\'re gonna party!',
                author: '2O Cent',
                date: '2022-09-25T17:07:42.556094Z'
             }
           ],
         },
         {
           id: '2',
           name: 'Vadonut',
           image: 'images/vadonut.png',
           category: 'appetizer',
           featured: false,
           label: 'New',
           price: '1.99',
           description: 'A quintessential ConFusion experience, is it a vada or is it a donut?',
           comments: [
             {
                rating: 5,
                comment: 'Celle la aussi con!!!',
                author: 'John Doeuf',
                date: '2022-10-16T17:57:28.556094Z'
             },
           ],
         },
         {
           id: '3',
           name: 'ElaiCheese Cake',
           image: 'images/elaicheesecake.png',
           category: 'dessert',
           featured: false,
           label: '',
           price: '2.99',
           description: 'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
           comments: [
             {
                rating: 5,
                comment: 'On dirait que c\'était comme si que y avait bien mangé con!',
                author: 'Frank Ribéry',
                date: '2022-05-25T12:44:24.556094Z'
             },
             {
                rating: 5,
                comment: 'lorem Ips',
                author: 'Don Atello',
                date: '2022-05-31T15:55:20.556094Z'
             },
             {
                rating: 1,
                comment: 'j\'ai connue mieux!',
                author: 'Jamal O\'Gland',
                date: '2022-06-05T13:50:00.556094Z'
             },
             {
                rating: 5,
                comment: 'parfait!',
                author: 'Agoulou Granfaal',
                date: '2022-06-05T14:50:00.556094Z'
             },
             {
                rating: 2,
                comment: 'En Counia manman mouna qui fé sa!',
                author: 'Fuckly',
                date: '2022-03-25T17:57:28.556094Z'
             }
           ],
         }
      ];

      dishService.getDishes()
        .subscribe((dishes: any) => {
          expect(dishes.length).toBe(4);
        });
      let req = httpMock.expectOne('http://localhost:3000/dishes');
      expect(req.request.method).toBe("GET");
      req.flush(dishesItem);
      httpMock.verify();
    })));
});
