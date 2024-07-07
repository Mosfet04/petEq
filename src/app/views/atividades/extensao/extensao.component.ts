import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-extensao",
  templateUrl: "./extensao.component.html",
})
export class ExtensaoComponent implements OnInit {
  constructor() {}
  openTabEnsino = 1;
  openTabSocial = 1;
  openTabDivulga = 1;
  toggleTabsEnsino($tabNumber: number){
    this.openTabEnsino = $tabNumber;
  }
  toggleTabsSocial($tabNumber: number){
    this.openTabSocial = $tabNumber;
  }
  toggleTabsDivulga($tabNumber: number){
    this.openTabDivulga = $tabNumber;
  }
  ngOnInit(): void {}
}
