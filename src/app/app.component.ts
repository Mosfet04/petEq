import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  title = "angular-dashboard-page";
  isIframe = false; // Propriedade necessária para o template
  
  constructor() {}

  ngOnInit(): void {
    // Verifica se está rodando em iframe
    this.isIframe = window !== window.parent && !window.opener;
  }
}
