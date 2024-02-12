import ProfilComponent from "./profil.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {expect} from "@jest/globals";
import {MatCardModule} from "@angular/material/card";
import {OAuthService} from "angular-oauth2-oidc";
import {MatIconModule} from "@angular/material/icon";
import {DatePipe, NgIf} from "@angular/common";

describe('ProfilComponent', () => {
  let component: ProfilComponent;
  let fixture: ComponentFixture<ProfilComponent>;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const fakeOauthService: jest.Mocked<OAuthService> = {
    getIdToken: jest.fn(),
    getIdentityClaims: jest.fn(),
    getIdTokenExpiration: jest.fn(),
    getAccessTokenExpiration: jest.fn()
  }
  fakeOauthService.getIdToken.mockReturnValue('id Token Value');
  fakeOauthService.getIdentityClaims.mockReturnValue({
    given_name: 'given_name_value',
    family_name: 'family_name_value',
    email: 'email_value'
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule,
        DatePipe,
        NgIf
      ],
      providers: [{provide: OAuthService, useValue: fakeOauthService}]
    }).compileComponents();
    fixture = TestBed.createComponent(ProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fakeOauthService.getIdToken).toHaveBeenCalled();
    expect(fakeOauthService.getIdentityClaims).toHaveBeenCalled();
  });
});
