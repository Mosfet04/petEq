import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
interface Extensao {
  Id: number;
  Nome: string;
  Tipo_extensao: string;
  Descricao: string;
  Ativo: boolean;
}
interface ExtensaoUpdate {
  ativo: boolean;
  descricao: string;
  tipo: number;
  nome: string;
}
enum TipoExtensao {
  "Ensino para alem" = 1,
  "Acoes Sociais" = 2,
  "Divulgacao Esclarecimento" = 3
}
@Component({
  selector: 'app-extensaoAdmin',
  templateUrl: './extensao.component.html'
})
export class ExtensaoAdminComponent implements OnInit {
  constructor() {}
  extensaoLista: Extensao[] = [];
  barra: string[] = [];

  async ngOnInit() {
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await axios.get(environment.urlBackEnd + "/extensao?page=" + page + "&per_page=100");

      for (let extensaoBack of response.data.items) {
        let extensao: Extensao = {
          Id: extensaoBack.id,
          Nome: extensaoBack.nome,
          Tipo_extensao: String(TipoExtensao[extensaoBack.tipo as keyof typeof TipoExtensao]),
          Descricao: extensaoBack.descricao,
          Ativo: extensaoBack.ativo
        };
        this.extensaoLista.push(extensao);
      }
      if (this.extensaoLista.length > 0) {
        this.barra = Object.keys(this.extensaoLista[0]);
      }

      hasNextPage = response.data.hasNextPage;
      page++;
    }
  }

  async atualizarConteudo(conteudo: Extensao){
    const index = this.extensaoLista.findIndex(item => item.Id === conteudo.Id);
    if (index !== -1) {
      this.extensaoLista[index] = conteudo;
      const extensaoUpdate: ExtensaoUpdate = this.mapExtensaoToUpdate(conteudo);
      const config = {
        headers:{
          Authorization: "Bearer " + localStorage.getItem("accessToken")	
        }
      }
      const responseAtualizacao = await axios.post(
        `${environment.urlBackEnd}/extensao/${conteudo.Id}`,
        extensaoUpdate,
        config
      );
    }
  }

  async deletarConteudo(conteudo: Extensao){
    const config = {
      headers:{
        Authorization: "Bearer " + localStorage.getItem("accessToken")	
      }
    }
    const responseDelete = await axios.delete(
      `${environment.urlBackEnd}/extensao/${conteudo.Id}`,
      config
    );
  }

  async adicionarConteudo(conteudo: Extensao){
    const extensaoAdicionar: ExtensaoUpdate = this.mapExtensaoToUpdate(conteudo);
    const config = {
      headers:{
        Authorization: "Bearer " + localStorage.getItem("accessToken")	
      }
    }
    const responseAdd = await axios.post(
      `${environment.urlBackEnd}/extensao`,
      extensaoAdicionar,
      config
    );
  }

  mapExtensaoToUpdate(extensao: Extensao): ExtensaoUpdate {
    return {
      nome: extensao.Nome,
      ativo: extensao.Ativo,
      descricao: extensao.Descricao,
      tipo: TipoExtensao[extensao.Tipo_extensao as keyof typeof TipoExtensao]
    };
  }
}
