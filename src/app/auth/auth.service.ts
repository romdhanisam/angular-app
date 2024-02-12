import {Injectable} from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {OauthErrorDialogComponent} from "./oauth-error-dialog/oauth-error-dialog.component";
import {OAuthErrorEvent} from "angular-oauth2-oidc";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

    constructor(
      private readonly oauthService: OAuthService,
      private readonly authConfig: AuthConfig,
      private readonly dialog: MatDialog,
      private readonly router: Router
    ) {}

    async initAuth(): Promise<any> {
      return new Promise<void>((resolveFn, rejectFn) => {
        // setup oauthService
        this.oauthService.configure(this.authConfig);
        this.oauthService.setStorage(sessionStorage);
          this.oauthService.loadDiscoveryDocumentAndLogin().then(isLoggedIn => {
          console.log("isLoggedIn : ",isLoggedIn);
          if (isLoggedIn) {
              console.log("this.isTokenExpired(this.oauthService.getIdToken() : ", this.isTokenExpired(this.oauthService.getIdToken()));
              if(this.oauthService.hasValidIdToken() && this.isTokenExpired(this.oauthService.getIdToken())) {
                  // silent automated token refresh, otherwise your token gets outdated and will not be refreshed
                  this.oauthService.setupAutomaticSilentRefresh();
              }
            resolveFn();
          } else {
           rejectFn();
          }
        });
        // Useful for debugging:
        this.oauthService.events.subscribe((event) => {
          console.log('event ',event)
          if(event.type === 'token_expires') {
              console.debug('received token_expires event', event);
          }
          if(event instanceof OAuthErrorEvent){
              console.error('OAuthErrorEvent Object:', event);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              let err: any = event.reason;
              if(event.type === 'discovery_document_load_error') {
                  err = (event.reason as HttpErrorResponse).message;
              } else
              if(event.type === 'token_error') {
                  err = event.params;
              }
              const matDialogConfig: MatDialogConfig = {
                  disableClose: true
              };
              this.dialog.open(OauthErrorDialogComponent, {
                  ...matDialogConfig,
                  data: {error: err}
              });
          } else {
              console.warn('OAuthEvent Object:', event);
          }
      });
      });
    }

    private isTokenExpired(tokenId: string):boolean {
        const expiry = (JSON.parse(atob(tokenId.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }

}
