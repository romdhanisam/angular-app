import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {OAuthService} from "angular-oauth2-oidc";
import {MatIconModule} from "@angular/material/icon";
import {DatePipe, NgIf} from "@angular/common";
import {interval, take} from "rxjs";

@Component({
  selector: 'app-profil',
  standalone: true,
  templateUrl: './profil.component.html',
  imports: [
    MatCardModule,
    MatIconModule,
    DatePipe,
    NgIf
  ],
  styleUrls: ['./profil.component.css']
})
export default class ProfilComponent implements OnInit {

  constructor(private readonly oauthService: OAuthService,) {
  }

  ngOnInit(): void {
    const numbers = interval(1000);

    const takeFourNumbers = numbers;//.pipe(take(4));

    takeFourNumbers.subscribe(x => {
      // console.log('hasValidAccessToken Next: ',x, this.hasValidAccessToken());
      // console.log('hasValidAccessToken Next: ',x, this.hasValidAccessToken());
      // console.log('===');
      console.log('isTokenExpired Next: ',x, this.isTokenExpired(this.oauthService.getIdToken()));
    });
  }

  isTokenExpired(tokenId: string):boolean {
    const expiry = (JSON.parse(atob(tokenId.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  get idToken(): string {
    return this.oauthService.getIdToken();
  }

  public hasValidAccessToken() { return this.oauthService.hasValidAccessToken(); }
  public hasValidToken() { return this.oauthService.hasValidAccessToken(); }


  get fullName(): string | null {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'] + ' ' + claims['family_name'];
  }

  get email(): string | null {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['email'];
  }

  get idTokenExpiration(): number {
    return this.oauthService.getIdTokenExpiration();
  }

  get accessTokenExpiration(): number {
    return this.oauthService.getAccessTokenExpiration();
  }

}
