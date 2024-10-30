import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";

interface Item {
  [key: string]: any;
}

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardTableComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }

  @Input()
  get titulo(): string {
    return this._titulo;
  }
  set titulo(titulo: string) {
    this._titulo = titulo;
  }

  @Input()
  get barra(): string[] {
    return this._barra;
  }
  set barra(barra: string[]) {
    this._barra = barra;
  }

  @Input()
  get conteudo(): Item[] {
    return this._conteudo;
  }
  set conteudo(conteudo: Item[]) {
    if (conteudo.length > 0 && Object.keys(conteudo[0]).length !== this._barra.length)
      throw new Error("O conteudo deve ter o mesmo tamanho da barra");
    this._conteudo = conteudo;
    this.cdr.markForCheck(); // Adicione esta linha para detectar mudanças quando o conteúdo for definido
  }

  private _color = "light";
  private _titulo = "Titulo";
  private _barra: string[] = ["1", "2", "3", "4", "5"];
  private _conteudo: Item[] = [{}, {}, {}, {}, {}];

  @Output()
  conteudoAlterado = new EventEmitter<Item>();
  mostrarModal = false;
  selectedRow: Item = {};

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  deletarRegistro(){
    console.log("Deletar registro");
  }

  salvarRegistro(){
    console.log("Salvar registro");
  }

  abrirModal(row: Item){
    this.selectedRow = { ...row };
    this.mostrarModal = true;
  }

  fecharModal(){
    this.mostrarModal = false;
  }

  atualizarConteudo(conteudo: Item){
    const key = this.getObjectKeys(conteudo)[0];
    const index = this._conteudo.findIndex(item => item[key] == this.selectedRow[key]);
    if (index !== -1) {
      this._conteudo[index] = conteudo;
      this.conteudoAlterado.emit(conteudo);
      this.cdr.markForCheck();
    }
    this.mostrarModal = false;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}
}