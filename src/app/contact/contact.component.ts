import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators , NgForm } from '@angular/forms';
import { visibility, flyInOut, expand } from '../animations/app.animations';
import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
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
export class ContactComponent implements OnInit {

  feedback?: Feedback;
  feedbackIds?: string[];
  feedbacks?: Feedback[];
  contactType = ContactType;
  errorMessage?: string;
  prev?: string;
  next?: string;

  feedbackForm!: FormGroup;
  feedbackCopy?: Feedback;
  visibility = 'shown';

  @ViewChild('fform') feedbackFormDirective!: NgForm;

  formErrors?: {[key: string]: string } = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': '',
    'messages': '',
  };

  validationMessages?: {[key: string]: any } = {
    'firstname': {
      'required': 'First name is required.',
      'minlength': 'First name must be at least 2 characters long.',
      'maxlength': 'First name cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 2 characters long.',
      'maxlength': 'Last name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel number is required.',
      'pattern': 'Tel number contain only numbers.'
    },
    'email': {
      'required': 'Email address is required.',
      'email': 'Email address is not in valid format.',
    },
    'messages': {
      'required': 'Message is required.',
    }
  };

  constructor(
    private feedbackService: FeedbackService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    @Inject('BaseUrl') public BaseUrl: string
  ) {
    this.createForm();
   }

  ngOnInit(): void {
    this.feedbackService.getFeedBackIds().subscribe((feedbackIds) => this.feedbackIds = feedbackIds);
    this.route.params
      .pipe(switchMap(
        (params: Params) => {
          console.log(this.feedback!.id);
          this.visibility = 'hidden';
          return this.feedbackService.getFeedBack(params['id']);
        }
      ))
      .subscribe(feedback => {
          this.feedback = feedback;
          this.feedbackCopy = feedback;
          this.setPrevNextFeedback(feedback.id);
          this.visibility = 'shown';
        },
        errmess => this.errorMessage = <any>errmess
      );
    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree:[false, Validators.required],
      contacttype: ['None', Validators.required],
      messages: ['', Validators.required],
    });

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit(): void {
    this.feedback = this.feedbackForm.value;
    this.feedback!.id = this.getRandomInt(1,1000000000000).toString();
    console.log(this.feedback);

    this.feedbackCopy = this.feedback;

    this.feedbackService.addFeedback(this.feedbackCopy!)
      .subscribe(
        feedback => {
          this.feedback = feedback;
          this.feedbackCopy = feedback;
          this.visibility = 'shown';
          setTimeout(() => {
            this.visibility = 'hidden';
          }, 5000);
        },
        errmess => {
          this.errorMessage = <any>errmess;
        }
    );

    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: '',
      messages: '',
    });
    this.feedbackFormDirective.resetForm();
  }

  onValueChanged(data?: any): void {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages![field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + '';
            }
          }
        }
      }
    }
  }

  setPrevNextFeedback(feedbackId?: string) {
    const index = this.feedbackIds!.indexOf(feedbackId!);
    this.prev = this.feedbackIds?.[(this.feedbackIds?.length + index - 1) % this.feedbackIds?.length]
    this.next = this.feedbackIds?.[(this.feedbackIds?.length + index + 1) % this.feedbackIds!.length]
  }

  getRandomInt(min:number, max:number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

}
