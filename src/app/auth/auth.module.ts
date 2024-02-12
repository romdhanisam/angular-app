import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
    OAuthModule,
    AuthConfig,
    ValidationHandler,
} from 'angular-oauth2-oidc';
import { AuthService } from './auth.service';
import { authConfig } from './auth.config';
import { OauthErrorDialogComponent } from './oauth-error-dialog/oauth-error-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {JsonPipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {JwksValidationHandler} from "angular-oauth2-oidc-jwks";

@NgModule({
    imports: [
        HttpClientModule,
        OAuthModule.forRoot(),
        MatDialogModule,
        JsonPipe,
        MatButtonModule
    ],
    providers: [
        AuthService,
        { provide: AuthConfig, useValue: authConfig },
        //To redirect automatically
        {
            provide: APP_INITIALIZER,
            useFactory: init_app,
            deps: [ AuthService ],
            multi: true
        },
        { provide: ValidationHandler, useClass: JwksValidationHandler },
    ],
    declarations: [OauthErrorDialogComponent],
    exports: [RouterModule]
})
export class AuthModule { }
export function init_app(authService: AuthService) {
    return () => authService.initAuth();
}
