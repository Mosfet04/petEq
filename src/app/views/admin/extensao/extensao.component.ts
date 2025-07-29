import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/services/notification.service';
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
  constructor(
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {}
  extensaoLista: Extensao[] = [];
  barra: string[] = [];

  async ngOnInit() {
    try {
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
        else{
          let emptyObject: Extensao;
          emptyObject = {
            Id: 0,
            Nome: "",
            Tipo_extensao: "",
            Descricao: "",
            Ativo: false
          }
          this.barra = Object.keys(emptyObject);
        }

        hasNextPage = response.data.hasNextPage;
        page++;
      }
      
      if (this.extensaoLista.length > 0) {
        this.notificationService.showSuccess('Extensões carregadas com sucesso!');
      }
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
  }

  async atualizarConteudo(conteudo: Extensao){
    try {
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
        this.notificationService.showSuccess('Extensão atualizada com sucesso!');
      }
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
  }

  async deletarConteudo(conteudo: Extensao){
    try {
      const config = {
        headers:{
          Authorization: "Bearer " + localStorage.getItem("accessToken")	
        }
      }
      const responseDelete = await axios.delete(
        `${environment.urlBackEnd}/extensao/${conteudo.Id}`,
        config
      );
      this.extensaoLista = this.extensaoLista.filter(item => item.Id !== conteudo.Id);
      this.cdr.markForCheck();
      this.notificationService.showSuccess('Extensão removida com sucesso!');
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
  }

  async adicionarConteudo(conteudo: Extensao){
    try {
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
      this.extensaoLista.find(x=> x.Nome == responseAdd.data.nome && x.Tipo_extensao == responseAdd.data.tipo && x.Descricao == responseAdd.data.descricao).Id = responseAdd.data.id;
      this.extensaoLista = [...this.extensaoLista];
      this.cdr.markForCheck();
      this.notificationService.showSuccess('Extensão adicionada com sucesso!');
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
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
