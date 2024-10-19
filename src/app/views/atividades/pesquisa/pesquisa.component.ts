import { Component, OnInit } from "@angular/core";
import axios from "axios";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-pesquisa",
  templateUrl: "./pesquisa.component.html",
})
export class PesquisaComponent implements OnInit {
  constructor() {}
  openTabAtual = 1;
  openTabAnterior = 1;

  pesquisasColetivasAtiva : any = [];
  pesquisasColetivasPassada : any = [];
  toggleTabsAtual($tabNumber: number){
    this.openTabAtual = $tabNumber;
  }
  toggleTabsAnterior($tabNumber: number){
    this.openTabAnterior = $tabNumber;
  }
  ngOnInit(): void 
  {
    this.fetchPesquisasColetivasAtivas();
    this.fetchPesquisasColetivasPassadas();
  }

  async fetchPesquisasColetivasAtivas() {
    const endpoint = "/pesquisa?ativo=true";
    try {
      const response = await axios.get(environment.urlBackEnd + endpoint);

      this.pesquisasColetivasAtiva = response.data.items;
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  }

  async fetchPesquisasColetivasPassadas() {
    const endpoint = "/pesquisa?ativo=false";
    try {
      const response = await axios.get(environment.urlBackEnd + endpoint);

      this.pesquisasColetivasPassada = response.data.items;
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  }
}
