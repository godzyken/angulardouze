import { Comment } from './comment';


export class Dish {
  id: string = '0';
  name: string = 'name';
  image: string = 'image';
  category: string = 'category';
  featured: boolean = false;
  label: string = 'label';
  price: string = '0€';
  description: string = 'description';
  comments: any = new Comment();
}
