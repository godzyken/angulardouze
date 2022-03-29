import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

  constructor(private leaderService: LeaderService) { }

  ngOnInit(): void {
    this.leaders = this.leaderService.getLeaders();
  }

  onSelect(leader: Leader) {
    this.selectedLeader = leader;
  }

}
