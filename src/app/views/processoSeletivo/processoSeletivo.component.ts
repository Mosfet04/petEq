import { Component, OnInit } from "@angular/core";

@Component({
  selector: "processo-seletivo",
  templateUrl: "./processoSeletivo.component.html",
})
export class ProcessoSeletivoComponent implements OnInit {
  constructor() {}
  pages : number = 10;
  ngOnInit(): void {}
}
