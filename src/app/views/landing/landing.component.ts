import { Component, OnInit } from "@angular/core";
import { data } from "autoprefixer";
import axios from "axios";
import { environment } from "src/environments/environment";

interface Atividade{
  nome: string;
  data: string;
  local: string;
  instrucoes: string;
}
@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",

})
export class LandingComponent implements OnInit {
  constructor() {}
  windowWidth: number;

  vertical = true
  timestepsEmBaixo = window.innerWidth < 770;
  dataAtividade : Atividade[] = [];
  
  async ngOnInit() {
    this.windowWidth = window.innerWidth;
    const response = await axios.get(environment.urlBackEnd + "/calendario_atividades?ativo=true");
    for (let atividadesBack of response.data.items) {
      let atividade : Atividade = {
        nome: atividadesBack.titulo,
        data: new Date(atividadesBack.dataInicio).toLocaleDateString(),
        local: atividadesBack.local,
        instrucoes: atividadesBack.descricao
      }
      this.dataAtividade.push(atividade);
    }
  }
}
