import { TestBed, async, inject } from '@angular/core/testing';
import { Leader } from '../shared/leader';
import { LeaderService } from './leader.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('LeaderService', () => {
  let service: LeaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        LeaderService
      ],
    });
    service = TestBed.get(LeaderService);
    service = TestBed.inject(LeaderService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch leaders as an Observable', async(inject([HttpTestingController, LeaderService],
  (httpClient: HttpTestingController, leaderService: LeaderService) => {
    const leaderItem = [
      {
         id: '0',
         name: 'Boss Ramen',
         image: 'images/ichiraku.png',
         designation: 'Chief Epicurious Officer',
         abbr: 'CEO',
         featured: false,
         // tslint:disable-next-line:max-line-length
         description: 'Our CEO, Peter, credits his hardworking East Asian immigrant parents who undertook the arduous journey to the shores of America with the intention of giving their children the best future. His mother\'s wizardy in the kitchen whipping up the tastiest dishes with whatever is available inexpensively at the supermarket, was his first inspiration to create the fusion cuisines for which The Frying Pan became well known. He brings his zeal for fusion cuisines to this restaurant, pioneering cross-cultural culinary connections.'
      },
      {
         id: '1',
         name: 'Dhanasekaran Witherspoon',
         image: 'images/ichiraku.png',
         designation: 'Chief Food Officer',
         abbr: 'CFO',
         featured: false,
         // tslint:disable-next-line:max-line-length
         description: 'Our CFO, Danny, as he is affectionately referred to by his colleagues, comes from a long established family tradition in farming and produce. His experiences growing up on a farm in the Australian outback gave him great appreciation for varieties of food sources. As he puts it in his own words, Everything that runs, wins, and everything that stays, pays!'
      },
      {
         id: '2',
         name: 'Agumbe Tang',
         image: 'images/ichiraku.png',
         designation: 'Chief Taste Officer',
         abbr: 'CTO',
         featured: false,
         // tslint:disable-next-line:max-line-length
         description: 'Blessed with the most discerning gustatory sense, Agumbe, our CFO, personally ensures that every dish that we serve meets his exacting tastes. Our chefs dread the tongue lashing that ensues if their dish does not meet his exacting standards. He lives by his motto, You click only if you survive my lick.'
      },
      {
         id: '3',
         name: 'Ichiraku Teuchi',
         image: 'images/ichiraku.png',
         designation: 'Executive Chef',
         abbr: 'EC',
         featured: true,
         // tslint:disable-next-line:max-line-length
         description: 'Award winning three-star Michelin chef with wide International experience having worked closely with whos-who in the culinary world, he specializes in creating mouthwatering Indo-Italian fusion experiences. He says, Put together the cuisines from the two craziest cultures, and you get a winning hit! Amma Mia!'
      }
    ];

    leaderService.getLeaders()
      .subscribe((leaders: any) => {
        expect(leaders.length).toBe(4)
      });
    let req = httpMock.expectOne('http://localhost:3000/leadership');
    expect(req.request.method).toBe('GET');
    req.flush(leaderItem);
    httpMock.verify();
  })));
});
