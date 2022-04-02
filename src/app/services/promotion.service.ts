import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../shared/baseUrl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service'

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

    getPromotions(): Observable<Promotion[]> {
      return this.http.get<Promotion[]>(baseUrl + 'promotions')
                      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getPromotion(id: string): Observable<Promotion> {
      return this.http.get<Promotion>(baseUrl + 'promotions/' + id)
                      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getFeaturedPromotion(): Observable<Promotion> {
      return this.http.get<Promotion[]>(baseUrl + 'promotions?featured=true')
                      .pipe(map(promotions => promotions[0]))
                      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
