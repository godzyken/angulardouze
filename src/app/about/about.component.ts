import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit {

  leaders?:Leader[];

  selectedLeader?: Leader;

  constructor(
  private leaderService: LeaderService,
  @Inject('BaseUrl') public BaseUrl: string
  ) { }

  ngOnInit(): void {
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders);
  }

  onSelect(leader: Leader) {
    this.selectedLeader = leader;
  }

}
