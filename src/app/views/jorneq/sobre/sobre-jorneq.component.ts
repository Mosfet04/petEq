import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre-jorneq',
  templateUrl: './sobre-jorneq.component.html'
})
export class SobreJorneqComponent {
  telefone = window.innerWidth < 770 ? true : false;
}