import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/services/notification.service';

interface PlanejamentoRelatorio
{
  Ano_do_documento: string;
  Id: number;
  Link: string;
  Tipo_registro: string;
}
interface PlanejamentoRelatorioAdicionar
{
  anoDocumento: string;
  link: string;
  tipoDocumento: string;
}
@Component({
  selector: 'app-planejamentoRelatorio',
  templateUrl: './planejamentoRelatorio.component.html'
})
export class PlanejamentoRelatorioComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {}
  planejamentoRelatorioLista: PlanejamentoRelatorio[] = [];
  barra: string[] = [];
  atualiza = false;
  async ngOnInit() {
    try {
      let page = 1;
      let hasNextPage = true;

      while (hasNextPage) {
        const response = await axios.get(environment.urlBackEnd + "/planejamento_relatorio?page="+page+"&per_page=100");

        for (let planejamentoRelatorioBack of response.data.items) {
          let parsedDate = new Date(planejamentoRelatorioBack.anoDocumento);
          parsedDate.setDate(parsedDate.getDate() + 1);

          let year = parsedDate.getFullYear();
          let month = parsedDate.getMonth() + 1; // getMonth() retorna 0-11, então adicionamos 1
          let semester = Math.ceil(month / 6);
          let formattedDate = `${year}.${semester}`;

          let planejamentoRelatorio: PlanejamentoRelatorio = {
            Id: planejamentoRelatorioBack.id,
            Link: planejamentoRelatorioBack.link,
            Tipo_registro: planejamentoRelatorioBack.tipo,
            Ano_do_documento: formattedDate,
          };
          this.planejamentoRelatorioLista.push(planejamentoRelatorio);
        }
        if (this.planejamentoRelatorioLista.length > 0) {
          this.barra = Object.keys(this.planejamentoRelatorioLista[0]);
        }
        else{
          let emptyObject: PlanejamentoRelatorio;
          emptyObject = {
            Id: 0,
            Link: "",
            Tipo_registro: "",
            Ano_do_documento: ""
          }
          this.barra = Object.keys(emptyObject);
        }

        hasNextPage = response.data.hasNextPage;
        page++;
      }
      
      if (this.planejamentoRelatorioLista.length > 0) {
        this.notificationService.showSuccess('Relatórios carregados com sucesso!');
      }
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
  }

  async atualizarConteudo(conteudo: PlanejamentoRelatorio){
    this.notificationService.showWarning("Funcionalidade não implementada, delete o recurso e insira-o novamente");
  }

  async deletarConteudo(conteudo: PlanejamentoRelatorio){
    try {
      const config = {
        headers:{
          Authorization: "Bearer " + localStorage.getItem("accessToken")	
        }
      }
      const responseDelete = await axios.delete(
        `${environment.urlBackEnd}/planejamento_relatorio/${conteudo.Id}`,
        config
      );
      this.planejamentoRelatorioLista = this.planejamentoRelatorioLista.filter(item => item.Id !== conteudo.Id);
      this.cdr.markForCheck();
      this.notificationService.showSuccess('Relatório removido com sucesso!');
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
  }

  async adicionarConteudo(conteudo: PlanejamentoRelatorio){
    try {
      const integranteAdicionar: PlanejamentoRelatorioAdicionar = this.mapPlanejamentoRelatorioToAdicionar(conteudo);
      const config = {
        headers:{
          Authorization: "Bearer " + localStorage.getItem("accessToken")	
        }
      }
      const responseAdd = await axios.post(
        `${environment.urlBackEnd}/planejamento_relatorio`,
        integranteAdicionar,
        config
      );
      this.planejamentoRelatorioLista.find(x=> x.Link == responseAdd.data.link && x.Tipo_registro == responseAdd.data.tipo).Id = responseAdd.data.id;
      this.planejamentoRelatorioLista = [...this.planejamentoRelatorioLista];
      this.cdr.markForCheck();
      this.notificationService.showSuccess('Relatório adicionado com sucesso!');
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
  }

  mapPlanejamentoRelatorioToAdicionar(conteudo: PlanejamentoRelatorio): PlanejamentoRelatorioAdicionar {
    let mapeametoRetorno : PlanejamentoRelatorioAdicionar = {
      anoDocumento: conteudo.Ano_do_documento,
      link: conteudo.Link,
      tipoDocumento: conteudo.Tipo_registro
    };
    return mapeametoRetorno;
  }
}
