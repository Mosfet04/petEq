import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
interface CalendarioAtividades {
  Id: number;
  Titulo: string;
  Descricao: string;
  Data_Inicio: string;
  Local: string;
  Ativo: boolean;
}
interface CalendarioAtividadesUpdate {
  titulo: string;
  descricao: string;
  ativo: boolean;
  dataInicio: string;
  local: string;
}
@Component({
  selector: 'app-calendarioAtividadesAdmin',
  templateUrl: './calendarioAtividades.component.html'
})
export class CalendarioAtividadesAdminComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  calendarioAtividadesLista: CalendarioAtividades[] = [];
  barra: string[] = [];

  async ngOnInit() {
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await axios.get(environment.urlBackEnd + "/calendario_atividades?page=" + page + "&per_page=100");

      for (let atividadesBack of response.data.items) {
        let atividades: CalendarioAtividades = {
          Id: atividadesBack.id,
          Titulo: atividadesBack.titulo,
          Descricao: atividadesBack.descricao,
          Ativo: atividadesBack.ativo,
          Data_Inicio: new Date(atividadesBack.dataInicio).toLocaleDateString(),
          Local: atividadesBack.local
        };
        this.calendarioAtividadesLista.push(atividades);
      }
      if (this.calendarioAtividadesLista.length > 0) {
        this.barra = Object.keys(this.calendarioAtividadesLista[0]);
      }
      else{
        let emptyObject: CalendarioAtividades;
        emptyObject = 
        {
          Id: 0,
          Titulo: "",
          Descricao: "",
          Data_Inicio: "",
          Local: "",
          Ativo: false
        };
        this.barra = Object.keys(emptyObject);
      }

      hasNextPage = response.data.hasNextPage;
      page++;
    }
  }

  async atualizarConteudo(conteudo: CalendarioAtividades){
    const index = this.calendarioAtividadesLista.findIndex(item => item.Id === conteudo.Id);
    if (index !== -1) {
      this.calendarioAtividadesLista[index] = conteudo;
      const calendarioAtividadesUpdate: CalendarioAtividadesUpdate = this.mapCalendarioAtividadesToUpdate(conteudo);
      const config = {
        headers:{
          Authorization: "Bearer " + localStorage.getItem("accessToken")	
        }
      }
      const responseAtualizacao = await axios.post(
        `${environment.urlBackEnd}/calendario_atividades/${conteudo.Id}`,
        calendarioAtividadesUpdate,
        config
      );
    }
  }

  async deletarConteudo(conteudo: CalendarioAtividades){
    const config = {
      headers:{
        Authorization: "Bearer " + localStorage.getItem("accessToken")	
      }
    }
    const responseDelete = await axios.delete(
      `${environment.urlBackEnd}/calendario_atividades/${conteudo.Id}`,
      config
    );
    this.calendarioAtividadesLista = this.calendarioAtividadesLista.filter(item => item.Id !== conteudo.Id);
    this.cdr.markForCheck();
  }

  async adicionarConteudo(conteudo: CalendarioAtividades){
    const extensaoAdicionar: CalendarioAtividadesUpdate = this.mapCalendarioAtividadesToUpdate(conteudo);
    const config = {
      headers:{
        Authorization: "Bearer " + localStorage.getItem("accessToken")	
      }
    }
    const responseAdd = await axios.post(
      `${environment.urlBackEnd}/calendario_atividades`,
      extensaoAdicionar,
      config
    );
    this.calendarioAtividadesLista.find(x => x.Titulo == responseAdd.data.titulo && x.Descricao == responseAdd.data.descricao).Id = responseAdd.data.id;
    this.calendarioAtividadesLista = [...this.calendarioAtividadesLista];
    this.cdr.markForCheck();
  }

  mapCalendarioAtividadesToUpdate(atividades: CalendarioAtividades): CalendarioAtividadesUpdate {
    return {
      titulo: atividades.Titulo,
      ativo: atividades.Ativo,
      descricao: atividades.Descricao,
      dataInicio: atividades.Data_Inicio,
      local: atividades.Local
    };
  }
}
