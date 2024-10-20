import { Component, OnInit } from "@angular/core";
import { MsalService } from "@azure/msal-angular";
import { loginRequest } from "src/app/auth-config";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  constructor(private authService: MsalService) {}

  ngOnInit(): void {}
  login() {
    this.authService.loginPopup(loginRequest)
      .subscribe({
        next: (result) => {
          //console.log("Login successful:", result);
        },
        error: (error) => {
          console.error("Login failed:", error);
        },
      });
  }
}
