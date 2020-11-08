
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public _cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this._cookieService.get('token')}`
      }
    });

    return next.handle(request);
  }
}