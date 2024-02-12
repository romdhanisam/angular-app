export const environment = {
  production: false,
  env: 'QA',
  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://localhost:8080/auth/realms/realm1',

    // URL of the SPA to redirect the user to after login
    redirectUri: 'http://localhost:4200/',

    // The SPA's id.
    clientId: 'client1',

    responseType: 'code',
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    scope: 'openid profile email',
    // Remove the requirement of using Https to simplify the demo
    // THIS SHOULD NOT BE USED IN PRODUCTION
    // USE A CERTIFICATE FOR YOUR IDP
    // IN PRODUCTION
    requireHttps: false,
    // at_hash is not present in JWT token
    // showDebugInformation: true,
    // disableAtHashCheck: true
  }
};
