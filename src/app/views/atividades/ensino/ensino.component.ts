import { Component, OnInit } from "@angular/core";
import axios from "axios";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-ensino",
  templateUrl: "./ensino.component.html",
})
export class EnsinoComponent implements OnInit {
  constructor() {}
  miniCursosAtivos : any = [];
  openTab = 0;
  
  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }

  ngOnInit(): void {
    this.fetchMiniCursos();
  }

  async fetchMiniCursos() {
    const endpoint = "/mini_cursos?ativo=true";
    try {
      const response = await axios.get(environment.urlBackEnd + endpoint);

      this.miniCursosAtivos = response.data.items;
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  }
}
