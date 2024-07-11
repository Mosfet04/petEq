import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-noticias",
  templateUrl: "./noticias.component.html",
})
export class NoticiasComponent implements OnInit {
  constructor() {}
  modalSearch = false;
  toggleModalSearch(){
    this.modalSearch = !this.modalSearch;
  }

  opcoes = ['Nenhum','Ensino', 'Pesquisa', 'Extensão', 'Processo Seletivo'];
  opcaoSelecionada: string;

  reloadPage(){
    location.reload();
  }
  ngOnInit(): void {}
}
