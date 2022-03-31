import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { visibility, flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
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
export class AboutComponent implements OnInit {

  leaders?:Leader[];
  leadersErrMess?:string;

  selectedLeader?: Leader;

  constructor(
  private leaderService: LeaderService,
  @Inject('BaseUrl') public BaseUrl: string
  ) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
    .subscribe(
      leaders => this.leaders = leaders,
      errmess => this.leadersErrMess = <any>errmess
    );
  }

  onSelect(leader: Leader) {
    this.selectedLeader = leader;
  }

}
