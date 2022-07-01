import { HttpEvent , HttpRequest , HttpHandler , HttpInterceptor } from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

export class JwtInterceptor implements HttpInterceptor {

    public static getToken(): string {
        console.log("getToken() : " + JSON.stringify(sessionStorage.getItem("token")));
        return sessionStorage.getItem("token");
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = JwtInterceptor.getToken();
        request = request.clone({
            setHeaders: {Authorization: `Bearer ${token}`}
        });
        return next.handle(request);
    }
}
