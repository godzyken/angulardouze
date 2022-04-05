import { TestBed, async, inject} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FeedbackService } from './feedback.service';

describe('FeedbackService', () => {
  let service: FeedbackService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeedbackService],
    });
    service = TestBed.inject(FeedbackService);
    service = TestBed.get(FeedbackService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch feedbacks as an Observable', async(inject([HttpTestingController, FeedbackService],
  (httpClient: HttpTestingController, feedbackService: FeedbackService) => {
    const feedbackItem = [
      {
        "id": "0",
        "firstName": "Banboo",
        "lastName": "Lalégo",
        "telnum": 0,
        "email": "iskander@molt.fr",
        "agree": false,
        "contacttype": "None",
        "messages": "un message sa mere"
      },
      {
        "id": "1",
        "firstName": "jhon",
        "lastName": "donknownofink",
        "telnum": 0,
        "email": "itrer@molt.fr",
        "agree": true,
        "contacttype": "None",
        "messages": "un message de son pere"
      },
      {
        "agree": true,
        "contacttype": "Tel",
        "email": "isgodz@fe.fee",
        "firstname": "Dore",
        "lastname": "Emryck",
        "messages": "boplolpo",
        "telnum": "0033066767787",
        "id": "eIurel6"
      },
      {
        "agree": true,
        "contacttype": "Tel",
        "email": "isgodz@fe.fee",
        "firstname": "Dore",
        "lastname": "Emryck",
        "messages": "dedererere",
        "telnum": 0,
        "id": "GLt57Vq"
      },
      {
        "firstname": "Dore",
        "lastname": "Emryck",
        "telnum": "0033066767787",
        "email": "isgodz@fe.fee",
        "agree": false,
        "contacttype": "None",
        "messages": "yo yo yo",
        "id": "Hl6suBT"
      },
      {
        "firstname": "Dore",
        "lastname": "Emryck",
        "telnum": "0033066767787",
        "email": "isgodz@fe.fee",
        "agree": true,
        "contacttype": "Tel",
        "messages": "fok u 404",
        "id": "AmMZSrC"
      },
      {
        "firstname": "Dore",
        "lastname": "Emryck",
        "telnum": "00990009909",
        "email": "isgodz@fe.fee",
        "agree": true,
        "contacttype": "Tel",
        "messages": "putin",
        "id": "xfeC8Nb"
      },
      {
        "firstname": "Dore",
        "lastname": "Emryck",
        "telnum": "0033066767787",
        "email": "isgodz@fe.fee",
        "agree": true,
        "contacttype": "Tel",
        "messages": "dorlisse",
        "id": "112799504591"
      }
    ];

    feedbackService.getFeedBacks()
      .subscribe((feedbacks: any) => {
        expect(feedbacks.length).toBe(8)
      });

    let req = httpMock.expectOne('http://localhost:3000/feedback');
    expect(req.request.method).toBe('GET');
    req.flush(feedbackItem);
    httpMock.verify();
  })));
});
