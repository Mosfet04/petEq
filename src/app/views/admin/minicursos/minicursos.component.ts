import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/services/notification.service';
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
  constructor(
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {}
  minicursosLista: Minicursos[] = [];
  barra: string[] = [];

  async ngOnInit() {
    try {
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
        else{
          let emptyObject: Minicursos;
          emptyObject = {
            Id: 0,
            Titulo: "",
            Ativo: false,
            Descricao: "",
            Imagem: ""
          }
          this.barra = Object.keys(emptyObject);
        }

        hasNextPage = response.data.hasNextPage;
        page++;
      }
      
      if (this.minicursosLista.length > 0) {
        this.notificationService.showSuccess('Minicursos carregados com sucesso!');
      }
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
  }

  async atualizarConteudo(conteudo: Minicursos){
    try {
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
        this.notificationService.showSuccess('Minicurso atualizado com sucesso!');
      }
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
  }

  async deletarConteudo(conteudo: Minicursos){
    try {
      const config = {
        headers:{
          Authorization: "Bearer " + localStorage.getItem("accessToken")	
        }
      }
      const responseDelete = await axios.delete(
        `${environment.urlBackEnd}/mini_cursos/${conteudo.Id}`,
        config
      );
      this.minicursosLista = this.minicursosLista.filter(item => item.Id !== conteudo.Id);
      this.cdr.markForCheck();
      this.notificationService.showSuccess('Minicurso removido com sucesso!');
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
  }

  async adicionarConteudo(conteudo: Minicursos){
    try {
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
      this.minicursosLista.find(x=> x.Titulo == responseAdd.data.titulo && x.Descricao == responseAdd.data.descricao).Id = responseAdd.data.id;
      this.minicursosLista = [...this.minicursosLista];
      this.cdr.markForCheck();
      this.notificationService.showSuccess('Minicurso adicionado com sucesso!');
    } catch (error) {
      this.notificationService.handleAxiosError(error);
    }
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
