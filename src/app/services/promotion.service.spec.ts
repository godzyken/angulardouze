import { TestBed, async, inject} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PromotionService } from './promotion.service';

describe('PromotionService', () => {
  let service: PromotionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PromotionService],
    });
    service = TestBed.inject(PromotionService);
    service = TestBed.get(PromotionService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch promotions as an Observable', async(inject([HttpTestingController, PromotionService],
    (httpClient: HttpTestingController, promotionService: PromotionService) => {
      const promotionItem = [
        {
          "id": "0",
          "name": "Weekend Grand Buffet",
          "image": "images/buffet.png",
          "featured": true,
          "label": "New",
          "price": "19.99",
          "description": "Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person "
        }
      ];

      promotionService.getPromotions()
        .subscribe((promotions: any) => {
          expect(promotions.length).toBe(1)
        });

      let req = httpMock.expectOne('http://localhost:3000/promotions');
      expect(req.request.method).toBe('GET');
      req.flush(promotionItem);
      httpMock.verify();
    })));
});
