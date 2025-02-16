import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

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
  constructor() {}
  processoSeletivoLista: ProcessoSeletivo[] = [];
  barra: string[] = [];
  atualiza = false;
  async ngOnInit() {
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
  }

  async atualizarConteudo(conteudo: ProcessoSeletivo){
    console.error("Funcionalidade não implementada, delete o recurso e insira-o novamente");
  }

  async deletarConteudo(conteudo: ProcessoSeletivo){
    const config = {
      headers:{
        Authorization: "Bearer " + localStorage.getItem("accessToken")	
      }
    }
    const responseDelete = await axios.delete(
      `${environment.urlBackEnd}/processo_seletivo/${conteudo.Id}`,
      config
    );
    window.location.reload();
  }

  async adicionarConteudo(conteudo: ProcessoSeletivo){
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
    window.location.reload();
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
