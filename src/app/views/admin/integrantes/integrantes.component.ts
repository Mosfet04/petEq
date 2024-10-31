import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
interface Integrante {
  Id: number;
  Nome: string;
  Matricula: string;
  Link_selfie: string;
  Setor: string;
  Email: string;
  Data_de_entrada: string;
  Data_de_desligamento: string;
}
interface IntegranteUpdate {
  nome: string;
  matricula: string;
  linkSelfie: string;
  email: string;
  desligamento: boolean;
  dataIngresso: string;
  setorId: number;
}
enum SetorId {
  "Computação" = 1,
  "Ata" = 2,
  "Marketing" = 3,
  "Orientador" = 4
}
@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.component.html'
})
export class IntegrantesComponent implements OnInit {
  constructor() {}
  integrantes: Integrante[] = [];
  barra: string[] = [];

  async ngOnInit() {
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await axios.get(environment.urlBackEnd + "/integrantes?page=" + page);

      for (let integranteBack of response.data.items) {
        let integrante: Integrante = {
          Id: integranteBack.id,
          Nome: integranteBack.nome,
          Matricula: integranteBack.matricula,
          Link_selfie: integranteBack.linkSelfie,
          Setor: integranteBack.setorNome,
          Email: integranteBack.email,
          Data_de_entrada: integranteBack.dataIngresso,
          Data_de_desligamento: integranteBack.dataDesligamento,
        };
        this.integrantes.push(integrante);
      }
      if (this.integrantes.length > 0) {
        this.barra = Object.keys(this.integrantes[0]);
      }

      hasNextPage = response.data.hasNextPage;
      page++;
    }
  }

  async atualizarConteudo(conteudo: Integrante){
    const index = this.integrantes.findIndex(item => item.Matricula === conteudo.Matricula);
    if (index !== -1) {
      this.integrantes[index] = conteudo;
      const integranteUpdate: IntegranteUpdate = this.mapIntegranteToUpdate(conteudo);
      const config = {
        headers:{
          Authorization: "Bearer " + localStorage.getItem("accessToken")	
        }
      }
      const responseAtualizacao = await axios.post(
        `${environment.urlBackEnd}/integrantes/${conteudo.Id}`,
        integranteUpdate,
        config
      );
      console.log(responseAtualizacao);
    }
  }

  async deletarConteudo(conteudo: Integrante){
    console.log("Entrou para deletar conteudo", conteudo);
    const config = {
      headers:{
        Authorization: "Bearer " + localStorage.getItem("accessToken")	
      }
    }
    const responseDelete = await axios.delete(
      `${environment.urlBackEnd}/integrantes/${conteudo.Id}?matricula=123`,
      config
    );
  }

  mapIntegranteToUpdate(integrante: Integrante): IntegranteUpdate {
    return {
      nome: integrante.Nome,
      matricula: integrante.Matricula,
      linkSelfie: integrante.Link_selfie,
      email: integrante.Email,
      desligamento: !!integrante.Data_de_desligamento, // Converte para booleano
      dataIngresso: integrante.Data_de_entrada,
      setorId: SetorId[integrante.Setor as keyof typeof SetorId]
    };
  }
}