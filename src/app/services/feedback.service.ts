import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../shared/baseUrl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  // GET: ok
  getFeedBacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(baseUrl + 'feedback')
                    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeedBack(id: string): Observable<Feedback> {
    return this.http.get<Feedback>(baseUrl + 'feedback/' + id)
                    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeedBacksAgreement(): Observable<Feedback> {
      return this.http
         .get<Feedback[]>(baseUrl + 'feedback?agree=true')
         .pipe(map(feedbacks => feedbacks[0]))
         .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeedBackIds(): Observable<string[] | any> {
    return this.getFeedBacks()
               .pipe(map(feedbacks => feedbacks.map(feedback => feedback.id)))
               .pipe(catchError(error => error));
  }

  putFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<Feedback>(baseUrl + 'feedback/' + feedback.id, feedback, httpOptions)
                    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // POST: OK
  addFeedback(feedback?: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Feedback>(baseUrl + 'feedback',feedback, httpOptions)
                    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  deleteFeedback(id?: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };
    return this.http.delete(baseUrl + 'feedback/' + id, httpOptions)
                    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
