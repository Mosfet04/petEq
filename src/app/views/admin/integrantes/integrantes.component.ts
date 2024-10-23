import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
interface Integrante {
  Nome: string;
  Matricula: string;
  Setor: string;
  Email: string;
  Data_de_entrada: string;
  Data_de_desligamento: string;
}
@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.component.html'
})
export class IntegrantesComponent implements OnInit {
  constructor() {}
  integrantes: Integrante[] = [];
  async ngOnInit() {
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await axios.get(environment.urlBackEnd + "/integrantes?page=" + page);

      for (let integranteBack of response.data.items) {
        let integrante: Integrante = {
          Nome: integranteBack.nome,
          Matricula: integranteBack.matricula,
          Setor: integranteBack.setorNome,
          Email: integranteBack.email,
          Data_de_entrada: integranteBack.dataIngresso,
          Data_de_desligamento: integranteBack.dataDesligamento,
        };
        this.integrantes.push(integrante);
      }

      hasNextPage = response.data.hasNextPage;
      page++;
    }
  }

}
