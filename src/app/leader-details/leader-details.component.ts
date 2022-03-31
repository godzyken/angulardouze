import { Component, OnInit, ViewEncapsulation, Input, Inject } from '@angular/core';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-leader-details',
  templateUrl: './leader-details.component.html',
  styleUrls: ['./leader-details.component.scss']
})
export class LeaderDetailsComponent implements OnInit {

  @Input()
  leader?:Leader;

  constructor(
    @Inject('BaseUrl') public BaseUrl: string
  ) { }

  ngOnInit(): void {

  }
}
