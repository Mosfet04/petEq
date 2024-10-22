import { Component } from "@angular/core";
import { MsalService } from "@azure/msal-angular";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "angular-dashboard-page";
  isIframe = false;
  constructor(private authService: MsalService) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    this.authService.instance.initialize();
  }
}
