import {Inject, Injectable} from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import {ModuleConfig} from "../module-config";

@Injectable()
export class NoLoginGuard implements CanActivate {

    constructor(private router: Router, @Inject("ntLoginConfig") private ntLoginConfig: ModuleConfig) {}

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (sessionStorage.getItem("token") === null) {
            return true;
        } else {
            this.router.navigate([this.ntLoginConfig.homeComponentRoute]);
            return false;
        }
    }
}
