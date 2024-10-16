import { Component } from '@angular/core';

@Component({
  selector: 'navbar-jorneq',
  templateUrl: './navbar-jorneq.component.html'
})
export class NavBarJorneqComponent {
  mobileMenuOpen = false;
  navigation = [
    { name: 'Início da Jorneq', href: '/jorneq'},
    { name: 'Sobre a Jorneq', href: '/jorneq/sobre' },
    { name: 'Inscreva-se', href: '/jorneq/participe' },
    { name: 'Contato', href: '/jorneq/contato' },
    { name: 'Conheça o PET-EQ', href: '/'}
  ];

  setMobileMenuOpen(open: boolean) {
    this.mobileMenuOpen = open;
  }
}