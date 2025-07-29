import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/services/notification.service';
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
  constructor(
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {}
  pesquisaLista: Pesquisa[] = [];
  barra: string[] = [];

  async ngOnInit() {
    try {
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
      
      if (this.pesquisaLista.length > 0) {
        this.notificationService.showSuccess('Pesquisas carregadas com sucesso!');
      }
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
  }

  async atualizarConteudo(conteudo: Pesquisa){
    try {
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
        this.notificationService.showSuccess('Pesquisa atualizada com sucesso!');
      }
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
  }

  async deletarConteudo(conteudo: Pesquisa){
    try {
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
      this.notificationService.showSuccess('Pesquisa removida com sucesso!');
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
  }

  async adicionarConteudo(conteudo: Pesquisa){
    try {
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
      this.notificationService.showSuccess('Pesquisa adicionada com sucesso!');
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
  }

  mapPesquisaToUpdate(pesquisa: Pesquisa): PesquisaUpdate {
    return {
      nome: pesquisa.Nome,
      descricao: pesquisa.Descricao,
      ativo: pesquisa.Ativo
    };
  }
}
