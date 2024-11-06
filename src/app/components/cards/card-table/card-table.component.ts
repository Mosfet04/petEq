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
  @Input()
  get atualiza(): boolean {
    return this._atualiza;
  }
  set atualiza(atualiza: boolean) {
    this._atualiza = atualiza;
  }


  private _color = "light";
  private _titulo = "Titulo";
  private _barra: string[] = ["1", "2", "3", "4", "5"];
  private _conteudo: Item[] = [{}, {}, {}, {}, {}];
  private _atualiza = true;
  itemVazio: Item = {};

  @Output()
  conteudoAlterado = new EventEmitter<Item>();

  @Output()
  conteudoDeletado = new EventEmitter<Item>();

  @Output()
  conteudoAdicionado = new EventEmitter<Item>();

  mostrarModal = false;
  selectedRow: Item = {};
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  sortTable(column: string) {
    if (this.sortedColumn === column) {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        this.sortDirection = null;
        this.sortedColumn = 'Id'; // Ordenar pela coluna 'Id'
      } else {
        this.sortDirection = 'asc';
      }
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    if (this.sortDirection) {
      this._conteudo.sort((a, b) => {
        if (a[column] < b[column]) {
          return this.sortDirection === 'asc' ? -1 : 1;
        } else if (a[column] > b[column]) {
          return this.sortDirection === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    } else {
      // Ordenar pela coluna 'Id' quando sortDirection for null
      this._conteudo.sort((a, b) => {
        if (a['Id'] < b['Id']) {
          return -1;
        } else if (a['Id'] > b['Id']) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    this.cdr.markForCheck();
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  deletarRegistro(conteudo: string) {

    const index = this._conteudo.findIndex(item => item["Id"] == conteudo);
    if (index !== -1) {
      const deletedItem = this._conteudo.splice(index, 1)[0];
      this.conteudoDeletado.emit(deletedItem);
      this.cdr.markForCheck();
    } else {
      console.error('Item não encontrado na lista.');
    }

    this.mostrarModal = false;
  }

  abrirModalAdicionar(barra: string[]) {
    this.itemVazio = {};
    barra.forEach((item, index) => {
      this.itemVazio[item] = "";
    });
    this.abrirModal(this.itemVazio);
  }

  abrirModal(row: Item){
    this.selectedRow = { ...row };
    this.mostrarModal = true;
  }

  fecharModal(){
    this.mostrarModal = false;
  }

  atualizarConteudo(conteudo: Item){
    if (this.selectedRow["Id"] === undefined || this.selectedRow["Id"] === "") {
      this._conteudo.push(conteudo);
      this.conteudoAdicionado.emit(conteudo);
      this.cdr.markForCheck();
    }
    else{
      const key = this.getObjectKeys(conteudo)[0];
      const index = this._conteudo.findIndex(item => item[key] == this.selectedRow[key]);
      if (index !== -1) {
        this._conteudo[index] = conteudo;
        this.conteudoAlterado.emit(conteudo);
        this.cdr.markForCheck();
      }
    }
    
    this.mostrarModal = false;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}
}