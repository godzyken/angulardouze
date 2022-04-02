import { Component, OnInit, ViewEncapsulation, Input, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { visibility, flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-leader-details',
  templateUrl: './leader-details.component.html',
  styleUrls: ['./leader-details.component.scss'],
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
export class LeaderDetailsComponent implements OnInit {

  @Input()
  leader?:Leader;

  leaderIds?: string[];
  errorMessage?: string;
  visibility = 'shown';

  constructor(
    private leaderService: LeaderService,
    private location: Location,
    private route: ActivatedRoute,
    @Inject('BaseUrl') public BaseUrl: string
  ) { }

  ngOnInit(): void {
    this.leaderService.getLeadIds().subscribe((leaderIds) => this.leaderIds = leaderIds);
    this.route.params
      .pipe(switchMap(
        (params: Params) => {
          this.visibility = 'hidden';
          return this.leaderService.getLeader(params['id']);
        }
      ))
      .subscribe(leader => {
        this.leader = leader;
        this.visibility = 'shown';
      },
        errmess => this.errorMessage = <any>errmess
      );
  }
}
