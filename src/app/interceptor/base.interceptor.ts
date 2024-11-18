import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Base URL for api requests
const baseUrl = 'http://localhost:3000';


/**
 * 
 * @param req get the request through httpclient
 * @param next the next interceptor or backend where rqst is forwarded
 * @returns response
 */
export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    url: `${baseUrl}/${req.url}`
  });

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error.message);
      return throwError(() => error);
    })
  );
};