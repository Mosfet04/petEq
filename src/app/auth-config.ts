import { Configuration, InteractionType, LogLevel } from "@azure/msal-browser";
import { JwtHelperService } from '@auth0/angular-jwt';

export const msalConfig: Configuration = {
  auth: {
    clientId: "2f6d798c-85c5-4c07-ab80-04bcabfd0f01",
    authority: "https://login.microsoftonline.com/3faa0a62-eaff-4053-986f-9ecf9237e044",
    redirectUri: "https://pet-eq.vercel.app/admin/dashboard",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

export function isTokenExpired(token: string): boolean {
  const helper = new JwtHelperService();
  return helper.isTokenExpired(token);
}
