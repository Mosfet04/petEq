import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
interface Pesquisa {
  Id: number;
  Ativo: boolean;
  Nome: string;
  Descricao: string;
}
interface PesquisaUpdate {
  ativo: boolean;
  descricao: string;
  nome: string;
}

@Component({
  selector: 'app-pesquisaAdmin',
  templateUrl: './pesquisa.component.html'
})
export class PesquisaAdminComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  pesquisaLista: Pesquisa[] = [];
  barra: string[] = [];

  async ngOnInit() {
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await axios.get(environment.urlBackEnd + "/pesquisa?page=" + page + "&per_page=100");	
      for (let pesquisaBack of response.data.items) {
        let pesquisa: Pesquisa = {
          Id: pesquisaBack.id,
          Nome: pesquisaBack.nome,
          Ativo: pesquisaBack.ativo,
          Descricao: pesquisaBack.descricao
        };
        this.pesquisaLista.push(pesquisa);
      }
      if (this.pesquisaLista.length > 0) {
        this.barra = Object.keys(this.pesquisaLista[0]);
      }
      else
      {
        let emptyObject: Pesquisa;
        emptyObject = {
          Id: 0,
          Nome: "",
          Ativo: false,
          Descricao: ""
        }
        this.barra = Object.keys(emptyObject);
      }

      hasNextPage = response.data.hasNextPage;
      page++;
    }
  }

  async atualizarConteudo(conteudo: Pesquisa){
    const index = this.pesquisaLista.findIndex(item => item.Id === conteudo.Id);
    if (index !== -1) {
      this.pesquisaLista[index] = conteudo;
      const pesquisaUpdate: PesquisaUpdate = this.mapPesquisaToUpdate(conteudo);
      const config = {
        headers:{
          Authorization: "Bearer " + localStorage.getItem("accessToken")	
        }
      }
      const responseAtualizacao = await axios.post(
        `${environment.urlBackEnd}/pesquisa/${conteudo.Id}`,
        pesquisaUpdate,
        config
      );
    }
  }

  async deletarConteudo(conteudo: Pesquisa){
    const config = {
      headers:{
        Authorization: "Bearer " + localStorage.getItem("accessToken")	
      }
    }
    const responseDelete = await axios.delete(
      `${environment.urlBackEnd}/pesquisa/${conteudo.Id}`,
      config
    );
    this.pesquisaLista = this.pesquisaLista.filter(item => item.Id !== conteudo.Id);
    this.cdr.markForCheck();
  }

  async adicionarConteudo(conteudo: Pesquisa){
    const pesquisaAdicionar: PesquisaUpdate = this.mapPesquisaToUpdate(conteudo);
    const config = {
      headers:{
        Authorization: "Bearer " + localStorage.getItem("accessToken")	
      }
    }
    const responseAdd = await axios.post(
      `${environment.urlBackEnd}/pesquisa`,
      pesquisaAdicionar,
      config
    );
    this.pesquisaLista.find(x => x.Nome == responseAdd.data.nome && x.Descricao == responseAdd.data.descricao).Id = responseAdd.data.id;
    this.pesquisaLista = [...this.pesquisaLista];
    this.cdr.markForCheck();
  }

  mapPesquisaToUpdate(pesquisa: Pesquisa): PesquisaUpdate {
    return {
      nome: pesquisa.Nome,
      descricao: pesquisa.Descricao,
      ativo: pesquisa.Ativo
    };
  }
}
