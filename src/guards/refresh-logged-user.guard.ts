import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import {GlobalContextService} from "@bds/nt-angular-context";
import {LoggedUser} from "../classes/logged-user";

@Injectable()
export class RefreshLoggedUserGuard implements CanActivate {

    constructor(private router: Router, private globalContextService: GlobalContextService) {}

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const loggedUserString: string = sessionStorage.getItem("loggedUser");
        if (!this.globalContextService.getInnerSharedObject("loggedUser") && loggedUserString) {

            const loggedUser: LoggedUser = new LoggedUser(JSON.parse(loggedUserString));
            // scrittura in due modi del dato: normale su varialibe di sessione che come observable
            this.globalContextService.setSubjectInnerSharedObject("loggedUser", loggedUser);
            this.globalContextService.setInnerSharedObject("loggedUser", loggedUser);

        }

        return true;
    }
}
