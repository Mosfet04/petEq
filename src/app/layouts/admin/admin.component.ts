import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MsalService } from "@azure/msal-angular";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
})
export class AdminComponent implements OnInit {
  constructor(private authService: MsalService, private router: Router) {}
  ngOnInit(): void 
  {
    if(localStorage.getItem('accessToken') == null){
      try
      {
        const account = this.authService.instance.getAllAccounts()[0];
        this.authService.acquireTokenSilent({
          account: account,
          scopes: ["user.read.all"]
        }).subscribe({
          next: (response) => {
            localStorage.setItem('accessToken', response.accessToken);
          },
          error: (error) => {
            console.error(error);
          }
        });
      }catch(error){
        localStorage.clear();
        this.router.navigate(['/auth/login']);
        console.error(error);
      }
    }
  }
}
