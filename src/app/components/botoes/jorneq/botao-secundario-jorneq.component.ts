import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "botao-secundario-jorneq",
  templateUrl: "./botao-secundario-jorneq.component.html",
})
export class BotaoSecundarioJorneqComponent implements OnInit {
  @Input() link: string = "";
  @Input() text: string = "";
  constructor() {}

  ngOnInit(): void {}

  navigateToLink() {
    window.location.href = this.link;
  }
}
