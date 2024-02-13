import { AuthConfig } from 'angular-oauth2-oidc';
import {environment} from "../../environments/environment";

export const authConfig: AuthConfig = {

    // Url of the Identity Provider
    issuer: environment.keycloak.issuer,

    // URL of the SPA to redirect the user to after login
    redirectUri: environment.keycloak.redirectUri,
    // The SPA's id.
    // The SPA is registerd with this id at the auth-server
    clientId: environment.keycloak.clientId,
    responseType: environment.keycloak.responseType,
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    scope: environment.keycloak.scope,
    // Remove the requirement of using Https to simplify the demo
    // THIS SHOULD NOT BE USED IN PRODUCTION
    // USE A CERTIFICATE FOR YOUR IDP
    // IN PRODUCTION
    requireHttps: environment.keycloak.requireHttps,
    // Debug
    disablePKCE: environment.keycloak.disablePKCE,
    showDebugInformation: true,
    //timeoutFactor: 0.1,
    oidc: true,
    //fallbackAccessTokenExpirationTimeInSec: 10,
    // at_hash is not present in JWT token
    // showDebugInformation: environment.keycloak.showDebugInformation,
    // disableAtHashCheck: environment.keycloak.disableAtHashCheck
};
