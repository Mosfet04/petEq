import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",

})
export class LandingComponent implements OnInit {
  constructor() {}
  windowWidth: number;

  vertical = true
  timestepsEmBaixo = window.innerWidth < 770;
  dataAtividade = [
    {
    nome: "Mini-curso 1",
    data: "23/07/1996 10:00",
    local: "Lagoa da Prata",
    instrucoes: "Ipsum dolor"
    },
    {
      nome: "Mini-curso 2",
      data: "23/07/1996 10:00",
      local: "Lagoa da Prata",
      instrucoes: "Ipsum dolor"
    }
    ,
    {
      nome: "Mini-curso 3",
      data: "23/07/1996 10:00",
      local: "Lagoa da Prata",
      instrucoes: "Ipsum dolor"
    }
  ]
  
  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
  }
}
