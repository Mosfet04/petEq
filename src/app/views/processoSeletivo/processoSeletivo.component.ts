import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import axios from 'axios';

@Component({
  selector: "processo-seletivo",
  templateUrl: "./processoSeletivo.component.html",
})
export class ProcessoSeletivoComponent implements OnInit {
  pages: number;
  processoSeletivoList: any = [];
  currentPage: number = 1;
  constructor() {}

  ngOnInit(): void {
    this.fetchData(this.currentPage);
  }

  async fetchData(page : number): Promise<void> {
    const enpoint = `/processo_seletivo?page=${page}&per_page=2`;
    try {
      const response = await axios.get(environment.urlBackEnd + enpoint);

      this.processoSeletivoList = response.data.items;
      this.pages = response.data.totalPage;

    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  }
  onPageChanged(page: number): void {
    this.currentPage = page;
    this.fetchData(this.currentPage);
  }
}