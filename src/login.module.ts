import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModuleConfig} from "./module-config";
import {LoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms";
import {UtilityFunctions} from "./utils/utility-functions";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./utils/jwt.interceptor";
import {SessionManager} from "./utils/session-manager";
import {RefreshLoggedUserGuard} from "./guards/refresh-logged-user.guard";
import {LoginGuard} from "./guards/login.guard";
import {NoLoginGuard} from "./guards/no-login.guard";
import { HttpClientModule } from "@angular/common/http";

/**
 * file di inizializzazione del modulo. Fa la funzione di app module in un progetto angular.
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ]
})
export class LoginModule {
    /** Un modulo, per convenzione, si inizializza tramite un metodo statico chiamato forRoot.
     * Al metodo forRoot è possibile passare dei parametri.
     * @param config parametro di configurazione del modulo
     * @returns il modulo inizializzato
     */
    public static forRoot(ntLoginConfig: ModuleConfig): ModuleWithProviders {
        return {
            ngModule: LoginModule,
            /**
             * si definiscono i service del modulo
             */
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: JwtInterceptor,
                    multi: true
                },
                UtilityFunctions,
                SessionManager,
                RefreshLoggedUserGuard,
                LoginGuard,
                NoLoginGuard,
                {provide: "ntLoginConfig", useValue: ntLoginConfig} // in questo modo si definisce la variabile config in modo da porterla iniettare all'interno dei service
            ]
        };
    }
}
