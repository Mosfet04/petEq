import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre-jorneq',
  templateUrl: './sobre-jorneq.component.html'
})
export class SobreJorneqComponent {
  features = [
    { name: 'Programação', description: 'Veja a programação clicando no botão', botao: true },
    { name: 'Normas', description: 'Abaixo é possivel ver as normas para inscrever seu trabalho', botao: true },
  ];
}