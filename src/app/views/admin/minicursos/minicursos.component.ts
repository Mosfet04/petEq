import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
interface Minicursos {
  Id: number;
  Titulo: string;
  Ativo: boolean;
  Descricao: string;
  Imagem: string;
}
interface MinicursosUpdate {
  ativo: boolean;
  descricao: string;
  imagem: string;
  titulo: string;
}

@Component({
  selector: 'app-minicursosAdmin',
  templateUrl: './minicursos.component.html'
})
export class MinicursosAdminComponent implements OnInit {
  constructor() {}
  minicursosLista: Minicursos[] = [];
  barra: string[] = [];

  async ngOnInit() {
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await axios.get(environment.urlBackEnd + "/mini_cursos?page=" + page + "&per_page=100");

      for (let minicursoBack of response.data.items) {
        let minicurso: Minicursos = {
          Id: minicursoBack.id,
          Titulo: minicursoBack.titulo,
          Ativo: minicursoBack.ativo,
          Descricao: minicursoBack.descricao,
          Imagem: minicursoBack.imagem,
          
        };
        this.minicursosLista.push(minicurso);
      }
      if (this.minicursosLista.length > 0) {
        this.barra = Object.keys(this.minicursosLista[0]);
      }

      hasNextPage = response.data.hasNextPage;
      page++;
    }
  }

  async atualizarConteudo(conteudo: Minicursos){
    const index = this.minicursosLista.findIndex(item => item.Id === conteudo.Id);
    if (index !== -1) {
      this.minicursosLista[index] = conteudo;
      const minicursoUpdate: MinicursosUpdate = this.mapMinicursoToUpdate(conteudo);
      const config = {
        headers:{
          Authorization: "Bearer " + localStorage.getItem("accessToken")	
        }
      }
      const responseAtualizacao = await axios.post(
        `${environment.urlBackEnd}/mini_cursos/${conteudo.Id}`,
        minicursoUpdate,
        config
      );
    }
  }

  async deletarConteudo(conteudo: Minicursos){
    const config = {
      headers:{
        Authorization: "Bearer " + localStorage.getItem("accessToken")	
      }
    }
    const responseDelete = await axios.delete(
      `${environment.urlBackEnd}/mini_cursos/${conteudo.Id}`,
      config
    );
  }

  async adicionarConteudo(conteudo: Minicursos){
    const minicursoAdicionar: MinicursosUpdate = this.mapMinicursoToUpdate(conteudo);
    const config = {
      headers:{
        Authorization: "Bearer " + localStorage.getItem("accessToken")	
      }
    }
    const responseAdd = await axios.post(
      `${environment.urlBackEnd}/mini_cursos`,
      minicursoAdicionar,
      config
    );
  }

  mapMinicursoToUpdate(minicursos: Minicursos): MinicursosUpdate {
    return {
      ativo: minicursos.Ativo,
      descricao: minicursos.Descricao,
      imagem: minicursos.Imagem,
      titulo: minicursos.Titulo
    };
  }
}
