import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
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

  leaders?: Leader[];
  leadersErrMess?:string;

  selectedLeader?: Leader;
  visibility = 'shown';

  constructor(
    private route: ActivatedRoute,
    private leaderService: LeaderService,
    @Inject('BaseUrl') public BaseUrl: string
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params: Params) => {
        this.visibility = 'hidden';
        return this.leaderService.getLeaders();
      }))
      .subscribe(leaders => {
        this.leaders = leaders;
        this.visibility = "shown";
      },
        errmess => this.leadersErrMess = <any>errmess
    );
  }

  onSelect(leader: Leader) {
    this.selectedLeader = leader;
  }

}
