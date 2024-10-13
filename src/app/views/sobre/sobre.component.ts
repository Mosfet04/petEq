import { Component, OnInit } from "@angular/core";
import axios from "axios";
import { environment } from "src/environments/environment";

@Component({
  selector: "sobre",
  templateUrl: "./sobre.component.html",
})
export class SobreComponent implements OnInit {
  constructor() {}
  orientados : any = [];
  orientador : any;
  integrantes : any;
  ngOnInit(): void 
  {
    this.fetchIntegrantes();
  }

  async fetchIntegrantes()
  {
    const endpoint = "/integrantes?ativo=true";

    try{
      const response = await axios.get(environment.urlBackEnd + endpoint);

      response.data.items.forEach(integrantesPet => {
        if (integrantesPet.setorNome == "Orientador"){
          this.orientador = integrantesPet;
        } else{
          this.orientados.push(integrantesPet);
        }
      });
      this.integrantes = {
        orientador: this.orientador,
        orientados: this.orientados 
      };
    }
    catch(error){
      console.error('Erro ao fazer a requisição:', error);
    }
  }
}
