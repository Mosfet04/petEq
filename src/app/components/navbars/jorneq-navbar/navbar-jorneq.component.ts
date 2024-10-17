import { Component } from '@angular/core';

@Component({
  selector: 'navbar-jorneq',
  templateUrl: './navbar-jorneq.component.html'
})
export class NavBarJorneqComponent {
  mobileMenuOpen = false;
  navigation = [
    { name: 'Início da Jorneq', rota: '/jorneq'},
    { name: 'Sobre a Jorneq', rota: '/jorneq/sobre' },
    { name: 'Inscreva-se', rota: '/jorneq/participe' },
    { name: 'Contato', rota: '/jorneq/contato' },
    { name: 'Conheça o PET-EQ', rota: '/'}
  ];

  setMobileMenuOpen(open: boolean) {
    this.mobileMenuOpen = open;
  }
}