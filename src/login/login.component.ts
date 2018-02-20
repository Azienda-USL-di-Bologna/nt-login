import {Component, Inject, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { GlobalContextService } from "@bds/nt-angular-context";
import { LoggedUser } from "../classes/logged-user";
import {ModuleConfig} from "../module-config";

@Component({
    moduleId: module.id,
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

    private loginURL: string;

    public errorMessage = "";
    public show: boolean = false;

    constructor(public httpClient: HttpClient,
                private router: Router,
                private globalContextService: GlobalContextService,
                @Inject("ntLoginConfig") private ntLoginConfig: ModuleConfig) {
    }

    private setDataLogin(data: any, httpMethod: string) {
        sessionStorage.setItem("token", data.token);

        if (httpMethod === "GET") {
            sessionStorage.setItem("loginMethod", "sso");
        } else {
            sessionStorage.setItem("loginMethod", "local");
        }

        const loggedUser = new LoggedUser(data.userInfo);
        // scrittura in due modi del dato: normale su varialibe di sessione che come observable
        this.globalContextService.setSubjectInnerSharedObject("loggedUser", loggedUser);
        this.globalContextService.setInnerSharedObject("loggedUser", loggedUser);
        sessionStorage.setItem("loggedUser", JSON.stringify(data.userInfo));
    }

    public ngOnInit() {

        if (this.ntLoginConfig.loginURL) {
            this.loginURL = this.ntLoginConfig.loginURL;
        } else {
            const hostname: string = window.location.hostname;
            const port: string = hostname === "localhost" ? ":10006" : ":443";
            this.loginURL = window.location.protocol + "//" + hostname + port + this.ntLoginConfig.relativeURL;
        }

        this.httpClient.get<any>(this.loginURL)
            .subscribe(
                // Successful responses call the first callback.
                (data) => {
                    this.setDataLogin(data, "GET");

                    const redirectTo: string = sessionStorage.getItem("redirectTo");
                    if (redirectTo) {
                        console.log("redirectTo", redirectTo);
                        sessionStorage.removeItem("redirectTo");
                        this.router.navigateByUrl(redirectTo);
                    } else {
                        console.log("RedirectToHome");
                        this.router.navigate(["/home"], {queryParams: {reset: true}});
                    }
                },
                (err) => {
                    this.show = true;
                });

    }

    public login(form: NgForm) {
        this.errorMessage = "";

        this.httpClient.post(this.loginURL, {
            username: form.value.username,
            password: form.value.password,
            codiceAzienda: form.value.codiceAzienda
        })
            .subscribe(
                (data: any) => {
                    this.setDataLogin(data, "POST");
                    const redirectTo: string = sessionStorage.getItem("redirectTo");
                    if (redirectTo) {
                        console.log("redirectTo", redirectTo);
                        sessionStorage.removeItem("redirectTo");
                        this.router.navigateByUrl(redirectTo);
                    } else {
                        console.log("RedirectToHome");
                        this.router.navigate(["/home"], {queryParams: {reset: true}});
                    }
                },
                (err) => {
                    console.log(err);
                    form.value.username = "";
                    form.value.password = "";
                    console.log("Errore nel login!");
                    this.errorMessage = "Errore: username e/o password errati";
                }
            );
    }
}
