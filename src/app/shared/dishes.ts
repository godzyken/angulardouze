import { Dish } from './dish';

export const DISHES: Dish[] = [
 {
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
   image: '/assets/images/zucchipakoda.png',
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
   image: '/assets/images/vadonut.png',
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
   image: '/assets/images/elaicheesecake.png',
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
