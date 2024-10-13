import { Component, OnInit } from "@angular/core";
import axios from 'axios';
import { environment } from "src/environments/environment";
@Component({
  selector: "app-atividades",
  templateUrl: "./atividades.component.html",
})
export class AtividadesComponent implements OnInit {
  constructor() {}
  relatorios : any = [];
  planejamentos : any = [];

  openTab = 1;

  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }

  ngOnInit(): void 
  {
    this.fetchRelatoriosPlanejamentos();
  }

  async fetchRelatoriosPlanejamentos(){
    const endpoint = "/planejamento_relatorio";
    try{
      const response = await axios.get(environment.urlBackEnd + endpoint);

      response.data.items.forEach(planejamentoRelatorio => {
        if (planejamentoRelatorio.tipo == "planejamento"){
          this.planejamentos.push(planejamentoRelatorio);
        } else if (planejamentoRelatorio.tipo == "relatorio"){
          this.relatorios.push(planejamentoRelatorio)
        }
      });
    }
    catch(error){
      console.error('Erro ao fazer a requisição:', error);
    }
  }

  converterDataParaAnoSemestre(data: any): string {
    const date = new Date(data);
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }
    const ano = date.getFullYear();
    const mes = date.getMonth() + 1; // getMonth() retorna 0-11, então adicionamos 1
    const semestre = mes <= 6 ? 1 : 2;
    return `${ano}.${semestre}`;
  }
}
