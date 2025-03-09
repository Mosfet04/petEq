import { Component, OnInit, OnDestroy } from "@angular/core";
import axios from "axios";
import { environment } from "src/environments/environment";

@Component({
  selector: "sobre",
  templateUrl: "./sobre.component.html",
})
export class SobreComponent implements OnInit, OnDestroy {
  constructor() {}
  orientados : any = [];
  tutor : any;
  integrantes : any;
  private scriptElement: HTMLScriptElement | null = null;

  ngOnInit(): void 
  {
    this.fetchIntegrantes();
    this.loadScript();
  }

  ngOnDestroy(): void {
    this.removeScript();
  }

  private loadScript(): void {
    this.scriptElement = document.createElement('script');
    this.scriptElement.src = '/assets/utils/jscharting.js';
    this.scriptElement.async = true;
    document.body.appendChild(this.scriptElement);
  }

  private removeScript(): void {
    if (this.scriptElement && this.scriptElement.src.includes('jscharting.js')) {
      document.body.removeChild(this.scriptElement);
      this.scriptElement = null;
    }
  }

  async fetchIntegrantes()
  {
    const endpoint = "/integrantes?ativo=true&page=1&per_page=100";

    try{
      const response = await axios.get(environment.urlBackEnd + endpoint);

      response.data.items.forEach(integrantesPet => {
        if (integrantesPet.setorNome == "Tutor"){
          this.tutor = integrantesPet;
        } else{
          this.orientados.push(integrantesPet);
        }
      });
      this.orientados.sort((a,b) => a.setorNome.localeCompare(b.setorNome));
      this.integrantes = {
        tutor: this.tutor,
        orientados: this.orientados 
      };
    }
    catch(error){
      console.error('Erro ao fazer a requisição:', error);
    }
  }
}
