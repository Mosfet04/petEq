import { Component, OnInit, Input } from "@angular/core";

interface Item {
  [key: string]: any;
}

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
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
  }

  private _color = "light";
  private _titulo = "Titulo";
  private _barra: string[] = ["1", "2", "3", "4", "5"];
  private _conteudo: Item[] = [{}, {}, {}, {}, {}];

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  constructor() {}

  ngOnInit(): void {}
}