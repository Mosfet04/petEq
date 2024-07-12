// modal-search.component.ts

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "modal-search",
  templateUrl: "./modal-search.component.html",
})
export class ModalSearchComponent implements OnInit {
  @Output() modalSearchAlterado = new EventEmitter<boolean>();

  constructor() {}

  opcoes = ['Nenhum','Ensino', 'Pesquisa', 'Extensão', 'Processo Seletivo'];
  opcaoSelecionada: string = this.opcoes[0];

  toggleModalSearch() {
    this.modalSearchAlterado.emit(true);
  }

  ngOnInit(): void {}
}
