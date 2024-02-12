import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import HeaderComponent from "./header.component";
import {RouterTestingModule} from "@angular/router/testing";
import {StoreModule} from "@ngrx/store";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {BreakpointObserver} from "@angular/cdk/layout";
import {of} from "rxjs";
import {OAuthService} from "angular-oauth2-oidc";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const breakpointObserverMock: jest.Mocked<BreakpointObserver> = {
    observe: jest.fn()
  };
  breakpointObserverMock.observe.mockReturnValue(of());
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const fakeOauthService: jest.Mocked<OAuthService> = {
    getIdToken: jest.fn(),
    revokeTokenAndLogout: jest.fn()
  }
  fakeOauthService.getIdToken.mockReturnValue('id Token Value');
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        StoreModule.forRoot()
      ],
      providers: [
        {provide: BreakpointObserver, useValue: breakpointObserverMock},
        {provide: OAuthService, useValue: fakeOauthService}]
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
