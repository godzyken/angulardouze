import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { FormBuilder, FormGroup, Validators , NgForm} from '@angular/forms';
import { Comment } from '../shared/comment';
import { visibility, flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss'],
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
export class DishDetailsComponent implements OnInit {

  dish?: Dish;
  dishIds?: string[];
  errorMessage?: string;
  prev?: string;
  next?: string;
  iconLeft = faChevronLeft;
  currentDate = new Date();

  comment!: Comment;
  commentForm!: FormGroup;
  dishCopy?: Dish;
  visibility = 'shown';

  @ViewChild('cform') commentFormDirective!: NgForm;

  formErrors?: {[key: string]: string } = {
    'author': '',
    'comment': '',
  };

  validationComments?: {[key: string]: any } = {
    'author': {
      'required': 'Author name is required.',
      'minlength': 'Author name must be at least 2 characters long.',
      'maxlength': 'Author name cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is required.'
    }
  };


  constructor(
  private dishService: DishService,
  private location: Location,
  private route: ActivatedRoute,
  private fb: FormBuilder,
  @Inject('BaseUrl') public BaseUrl: string
  ) {
     this.createForm();
   }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params
      .pipe(switchMap(
        (params: Params) => {
          this.visibility = 'hidden';
          return this.dishService.getDish(params['id']);
        }
      ))
      .subscribe(dish => {
        this.dish = dish;
        this.dishCopy = dish;
        this.setPrevNextDish(dish.id);
        this.visibility = 'shown';
      },
        errmess => this.errorMessage = <any>errmess
      );
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      rating: 0,
      comment: ['', Validators.required],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      date: '',
    });

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit(): void {

    this.commentForm.value.date = this.currentDate.toISOString();
    this.comment = this.commentForm.value;
    console.log(this.comment);

    this.dishCopy!.comments.push(this.comment);
    this.dishService.putDish(this.dishCopy!)
      .subscribe(dish => {
        this.dish = dish;
        this.dishCopy = dish;
      },
       errmess => {
        this.errorMessage = <any>errmess;
       });

    this.commentForm.reset({
      rating: 0,
      comment: '',
      author: '',
      date: '',
    });

    this.commentFormDirective.resetForm();
  }

  onValueChanged(data?: any): void {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const comments = this.validationComments![field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += comments[key] + '';
            }
          }
        }
      }
    }

  }

  setPrevNextDish(dishId: string) {
    const index = this.dishIds!.indexOf(dishId);
    this.prev = this.dishIds![(this.dishIds!.length + index - 1) % this.dishIds!.length];
    this.next = this.dishIds![(this.dishIds!.length + index + 1) % this.dishIds!.length];
  }

  formatRating(value: number) {
    if(value >= 5) {
      return Math.round(value / 5) + 'rate';
    }

    return value;
  }

  goBack(): void {
    this.location.back();
  }
}
