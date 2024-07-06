import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pesquisa",
  templateUrl: "./pesquisa.component.html",
})
export class PesquisaComponent implements OnInit {
  constructor() {}
  openTabAtual = 1;
  openTabAnterior = 1;
  toggleTabsAtual($tabNumber: number){
    this.openTabAtual = $tabNumber;
  }
  toggleTabsAnterior($tabNumber: number){
    this.openTabAnterior = $tabNumber;
  }
  ngOnInit(): void {}
}
