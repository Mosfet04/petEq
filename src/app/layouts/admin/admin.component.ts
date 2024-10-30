import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MsalService } from "@azure/msal-angular";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { isTokenExpired } from "src/app/auth-config";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
})
export class AdminComponent implements OnInit {
  constructor(private authService: MsalService, private router: Router) {}
  ngOnInit(): void {
    const token = localStorage.getItem('accessToken');
    if (token == null || isTokenExpired(token)) {
      try {
        const account = this.authService.instance.getAllAccounts()[0];
        this.authService.acquireTokenSilent({
          account: account,
          scopes: ["user.read.all"]
        }).subscribe({
          next: (response) => {
            localStorage.setItem('accessToken', response.accessToken);
          },
          error: (error) => {
            if (error instanceof InteractionRequiredAuthError) {
              localStorage.clear();
              this.router.navigate(['/auth/login']);
            } else {
              console.error(error);
            }
          }
        });
      } catch (error) {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
        console.error(error);
      }
    }
  }
}
