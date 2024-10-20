import { Component, OnInit } from "@angular/core";
import axios from "axios";
import { list } from "postcss";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-extensao",
  templateUrl: "./extensao.component.html",
})
export class ExtensaoComponent implements OnInit {
  constructor() {}
  listEnsinoAlemDaUfu : any[] = [];
  listAcoesSociais : any[] = [];
  listDivulgacao: any[] = [];

  
  openTabEnsino = 1;
  openTabSocial = 1;
  openTabDivulga = 1;

  fetchExtensao() {
    const endpoint = `${environment.urlBackEnd}/extensao?ativo=true`;

    axios.get(endpoint+"&tipo=1").then((response) => {
      this.listEnsinoAlemDaUfu = response.data.items;
    });
    axios.get(endpoint+"&tipo=2").then((response) => {
      this.listAcoesSociais = response.data.items;
    });
    axios.get(endpoint+"&tipo=3").then((response) => {
      this.listDivulgacao = response.data.items;
    });
    
  }

  toggleTabsEnsino($tabNumber: number){
    this.openTabEnsino = $tabNumber;
  }
  toggleTabsSocial($tabNumber: number){
    this.openTabSocial = $tabNumber;
  }
  toggleTabsDivulga($tabNumber: number){
    this.openTabDivulga = $tabNumber;
  }
  ngOnInit(): void 
  {
    this.fetchExtensao();
  }
}
