import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
interface Integrante {
  Id: number;
  Nome: string;
  Matricula: string;
  Link_selfie: string;
  Linkedin: string;
  Setor: string;
  Email: string;
  Data_de_entrada: string;
  Data_de_desligamento: string;
}
interface IntegranteUpdate {
  nome: string;
  matricula: string;
  linkSelfie: string;
  linkedin: string;
  email: string;
  desligamento: boolean;
  dataIngresso: string;
  setorId: number;
}
interface IntegranteAdicionar {
  nome: string;
  matricula: string;
  linkSelfie: string;
  linkedin: string;
  email: string;
  dataDesligamento?: string | null;
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
  constructor(private cdr: ChangeDetectorRef) {}
  integrantes: Integrante[] = [];
  barra: string[] = [];

  async ngOnInit() {
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await axios.get(environment.urlBackEnd + "/integrantes?page=" + page + "&per_page=100");

      for (let integranteBack of response.data.items) {
        let integrante: Integrante = {
          Id: integranteBack.id,
          Nome: integranteBack.nome,
          Matricula: integranteBack.matricula,
          Link_selfie: integranteBack.linkSelfie,
          Linkedin: integranteBack.linkedin,
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
      else{
        let emptyObject: Integrante;
        emptyObject = {
          Id: 0,
          Nome: "",
          Matricula: "",
          Link_selfie: "",
          Linkedin: "",
          Setor: "",
          Email: "",
          Data_de_entrada: "",
          Data_de_desligamento: "",
        }
        this.barra = Object.keys(emptyObject);
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
    }
  }

  async deletarConteudo(conteudo: Integrante){
    const config = {
      headers:{
        Authorization: "Bearer " + localStorage.getItem("accessToken")	
      }
    }
    const responseDelete = await axios.delete(
      `${environment.urlBackEnd}/integrantes/${conteudo.Id}`,
      config
    );
    this.integrantes = this.integrantes.filter(item => item.Id !== conteudo.Id);
    this.cdr.markForCheck();
  }

  async adicionarConteudo(conteudo: Integrante){
    const integranteAdicionar: IntegranteAdicionar = this.mapIntegranteToAdicionar(conteudo);
    const config = {
      headers:{
        Authorization: "Bearer " + localStorage.getItem("accessToken")	
      }
    }
    const responseAdd = await axios.post(
      `${environment.urlBackEnd}/integrantes`,
      integranteAdicionar,
      config
    );
    this.integrantes.find(x=> x.Nome == responseAdd.data.nome && x.Matricula == responseAdd.data.matricula).Id = responseAdd.data.id;
    this.integrantes = [...this.integrantes];
    this.cdr.markForCheck();
  }

  mapIntegranteToUpdate(integrante: Integrante): IntegranteUpdate {
    return {
      nome: integrante.Nome,
      matricula: integrante.Matricula,
      linkSelfie: integrante.Link_selfie,
      linkedin: integrante.Linkedin,
      email: integrante.Email,
      desligamento: !!integrante.Data_de_desligamento, // Converte para booleano
      dataIngresso: integrante.Data_de_entrada,
      setorId: SetorId[integrante.Setor as keyof typeof SetorId]
    };
  }
  mapIntegranteToAdicionar(integrante: Integrante): IntegranteAdicionar {
    let mapeametoRetorno : IntegranteAdicionar = {
      nome: integrante.Nome,
      matricula: integrante.Matricula,
      linkSelfie: integrante.Link_selfie,
      linkedin: integrante.Linkedin,
      email: integrante.Email,
      dataIngresso: integrante.Data_de_entrada,
      setorId: SetorId[integrante.Setor as keyof typeof SetorId]
    };
    if (integrante.Data_de_desligamento) {
      mapeametoRetorno.dataDesligamento = integrante.Data_de_desligamento;
    }
    return mapeametoRetorno;
  }
}
