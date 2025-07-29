import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/services/notification.service';

interface ProcessoSeletivo
{
  Data_do_edital: string;
  Id: number;
  Link: string;
  Titulo: string;
}
interface ProcessoSeletivoAdicionar
{
  dataEdital: string;
  link: string;
  titulo: string;
}
@Component({
  selector: 'app-processoSeletivo',
  templateUrl: './processoSeletivoAdmin.component.html'
})
export class ProcessoSeletivoAdminComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {}
  processoSeletivoLista: ProcessoSeletivo[] = [];
  barra: string[] = [];
  atualiza = false;
  async ngOnInit() {
    try {
      let page = 1;
      let hasNextPage = true;

      while (hasNextPage) {
        const response = await axios.get(environment.urlBackEnd + "/processo_seletivo?page="+page+"&per_page=100");

        for (let processoSeletivoBack of response.data.items) {
          let parsedDate = new Date(processoSeletivoBack.dataEdital);

          let processoSeletivo: ProcessoSeletivo = {
            Id: processoSeletivoBack.id,
            Link: processoSeletivoBack.link,
            Titulo: processoSeletivoBack.titulo,
            Data_do_edital: parsedDate.toLocaleDateString(),
          };
          this.processoSeletivoLista.push(processoSeletivo);
        }
        if (this.processoSeletivoLista.length > 0) {
          this.barra = Object.keys(this.processoSeletivoLista[0]);
        }
        else
        {
          let emptyObject: ProcessoSeletivo;
          emptyObject = {
            Id: 0,
            Link: "",
            Titulo: "",
            Data_do_edital: ""
          }
          this.barra = Object.keys(emptyObject);
        }

        hasNextPage = response.data.hasNextPage;
        page++;
      }
      
      if (this.processoSeletivoLista.length > 0) {
        this.notificationService.showSuccess('Processos seletivos carregados com sucesso!');
      }
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
  }

  async atualizarConteudo(conteudo: ProcessoSeletivo){
    this.notificationService.showWarning("Funcionalidade não implementada, delete o recurso e insira-o novamente");
  }

  async deletarConteudo(conteudo: ProcessoSeletivo){
    try {
      const config = {
        headers:{
          Authorization: "Bearer " + localStorage.getItem("accessToken")	
        }
      }
      const responseDelete = await axios.delete(
        `${environment.urlBackEnd}/processo_seletivo/${conteudo.Id}`,
        config
      );
      this.processoSeletivoLista = this.processoSeletivoLista.filter((item) => item.Id !== conteudo.Id);
      this.cdr.markForCheck();
      this.notificationService.showSuccess('Processo seletivo removido com sucesso!');
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
  }

  async adicionarConteudo(conteudo: ProcessoSeletivo){
    try {
      const integranteAdicionar: ProcessoSeletivoAdicionar = this.mapProcessoSeletivoToAdicionar(conteudo);
      const config = {
        headers:{
          Authorization: "Bearer " + localStorage.getItem("accessToken")	
        }
      }
      const responseAdd = await axios.post(
        `${environment.urlBackEnd}/processo_seletivo`,
        integranteAdicionar,
        config
      );
      this.processoSeletivoLista.find(x=> x.Titulo == responseAdd.data.titulo && x.Link == responseAdd.data.link).Id = responseAdd.data.id;
      this.processoSeletivoLista = [...this.processoSeletivoLista];
      this.cdr.markForCheck();
      this.notificationService.showSuccess('Processo seletivo adicionado com sucesso!');
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
  }

  mapProcessoSeletivoToAdicionar(conteudo: ProcessoSeletivo): ProcessoSeletivoAdicionar {
    let mapeametoRetorno : ProcessoSeletivoAdicionar = {
      dataEdital: conteudo.Data_do_edital,
      link: conteudo.Link,
      titulo: conteudo.Titulo
    };
    return mapeametoRetorno;
  }
}
