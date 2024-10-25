import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

interface Item {
  [key: string]: any;
}

@Component({
  selector: "modal-generico",
  templateUrl: "./modal-generico.component.html",
})
export class ModalGenericoComponent implements OnInit, OnChanges {
  @Input()
  get barra(): string[] {
    return this._barra;
  }
  set barra(barra: string[]) {
    this._barra = barra;
  }


  @Input()
  get conteudo(): Item {
    return this._conteudo;
  }
  set conteudo(conteudo: Item) {
    this._conteudo = { ...conteudo };
  }

  private _conteudo: Item = {};
  private _barra: string[] = [];

  @Output()
  modalFechado = new EventEmitter<boolean>();

  @Output()
  conteudoAlterado = new EventEmitter<Item>();

  closeEditModal() {
    this._conteudo = {};
    this.modalFechado.emit(false);
  }

  saveChanges() {
    this.conteudoAlterado.emit(this._conteudo);
    this.closeEditModal();
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.conteudo && changes.conteudo.currentValue) {
      this._conteudo = changes.conteudo.currentValue;
      //console.log(this._conteudo);
    }
    if (changes.barra && changes.barra.currentValue) {
      this._barra = [...changes.barra.currentValue];
    }
  }
}