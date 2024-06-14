import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-atividades",
  templateUrl: "./atividades.component.html",
})
export class AtividadesComponent implements OnInit {
  constructor() {}
  openTab = 1;
  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }
  ngOnInit(): void {}
}
