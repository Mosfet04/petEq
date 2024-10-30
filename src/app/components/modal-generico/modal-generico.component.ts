import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface Item {
  [key: string]: any;
}

@Component({
  selector: "modal-generico",
  templateUrl: "./modal-generico.component.html",
})
export class ModalGenericoComponent implements OnInit, OnChanges {
  constructor(private fb: FormBuilder) {}
  
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
    this.updateFormGroup();
  }

  conteudoForm: FormGroup = this.fb.group({});
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
    this.conteudoAlterado.emit(this.conteudoForm.value);
    this.closeEditModal();
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  ngOnInit(): void {
    this.updateFormGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.conteudo && changes.conteudo.currentValue) {
      this._conteudo = changes.conteudo.currentValue;
      this.updateFormGroup();
    }
    if (changes.barra && changes.barra.currentValue) {
      this._barra = [...changes.barra.currentValue];
    }
  }

  private updateFormGroup() {
    if (this.conteudoForm) {
      this.conteudoForm = this.fb.group({});
      for (const key in this._conteudo) {
        if (this._conteudo.hasOwnProperty(key)) {
          this.conteudoForm.addControl(key, new FormControl(this._conteudo[key]));
        }
      }
    }
  }
}