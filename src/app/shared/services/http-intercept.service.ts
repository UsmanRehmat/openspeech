import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent, HttpResponseBase, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../Constants';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if(req.url.search('/api')==0)
    {
      const proxyReq = req.clone({
        url: APP_CONSTANTS.APIConfig.APIURL+req.url
      });
      return next.handle(proxyReq);
    }
    else  
    return next.handle(req);
      
  }
  constructor() { }
}
