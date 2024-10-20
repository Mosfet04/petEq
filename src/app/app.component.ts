import { Component } from "@angular/core";
import { MsalService } from "@azure/msal-angular";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "angular-dashboard-page";
  constructor(private authService: MsalService) {}

  ngOnInit(): void {
    this.authService.instance.initialize();
  }
}
