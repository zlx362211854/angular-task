import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { finalize, tap } from 'rxjs/operators';
export class BasicService {
    constructor(public http: HttpClient) { }


    protected handleError(error: HttpErrorResponse) {
        if (error.status === 400) {
            // A client-side or network error occurred. Handle it accordingly.
            window.location.pathname = '/login'
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modified = req.clone({ setHeaders: { "Authorization": localStorage.getItem('accessToken') || '' } });
        return next.handle(modified).pipe(
            tap({
                // Succeeds when there is a response; ignore other events
                next: (event) => {
                    // @ts-ignore
                    if (event.body?.code === 100) {
                        // @ts-ignore
                        alert(event.body.message)
                    }
                },

            }),

        );
    }
}