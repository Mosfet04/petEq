import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ensino",
  templateUrl: "./ensino.component.html",
})
export class EnsinoComponent implements OnInit {
  constructor() {}
  openTab = 1;
  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }
  ngOnInit(): void {}
}
