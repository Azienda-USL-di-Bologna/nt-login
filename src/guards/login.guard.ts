import {Inject, Injectable} from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import {ModuleConfig} from "../module-config";

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router, @Inject("ntLoginConfig") private ntLoginConfig: ModuleConfig) {}

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (sessionStorage.getItem("token") === null) {

            if (!( state.url.substring( 0, this.ntLoginConfig.loginComponentRoute.length ) === this.ntLoginConfig.loginComponentRoute)) {
                sessionStorage.setItem("redirectTo", state.url);
            }
            this.router.navigate([this.ntLoginConfig.loginComponentRoute]);
            return false;
        } else {
            return true;
        }
    }
}
