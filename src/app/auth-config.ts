import { Configuration, InteractionType, LogLevel } from "@azure/msal-browser";
import { JwtHelperService } from '@auth0/angular-jwt';

export const msalConfig: Configuration = {
  auth: {
    clientId: "2554d619-2b30-4d13-a032-aa202936d184",
    authority: "https://login.microsoftonline.com/5b7c6db5-8d4d-45c4-afbd-8c66cdff194b",
    redirectUri: "https://pet-eq.vercel.app/admin/dashboard",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

export function isTokenExpired(token: string): boolean {
  const helper = new JwtHelperService();
  console.log(helper.isTokenExpired(token), helper.getTokenExpirationDate(token));
  return helper.isTokenExpired(token);
}
