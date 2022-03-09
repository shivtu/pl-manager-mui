export const msalConfig = {
  auth: {
    clientId: `${process.env.REACT_APP_MSAL_CLIENT_ID}`,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_MSAL_AUTHORITY}/`,
    redirectUrl: `${process.env.REACT_APP_MSAL_REDIRECT_URL}`,
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ['User.Read'],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: `${process.env.REACT_APP_GRAPH_ME_ENDPOINT}`,
};
