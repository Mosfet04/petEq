import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "botao-principal-jorneq",
  templateUrl: "./botao-principal-jorneq.component.html",
})
export class BotaoPrincipalJorneqComponent implements OnInit {
  @Input() link: string = "";
  @Input() text: string = "";
  constructor() {}

  ngOnInit(): void {}
}
