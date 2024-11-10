import { Component } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-estilo-jorneq',
  templateUrl: './estilo-jorneq.component.html'
})
export class EstiloJorneqComponent {
  primaryColor: string = '#0891B2';
  secondaryColor: string = '#ff80b5';
  iconLink: string = '#000000';
  mobileMenuOpen = false;
  rotaAberta = '/jorneq';
  navigation = [
    { name: 'Início da Jorneq', rota: '/jorneq'},
    { name: 'Sobre a Jorneq', rota: '/jorneq/sobre' },
    { name: 'Inscreva-se', rota: '/jorneq/participe' },
    { name: 'Contato', rota: '/jorneq/contato' },
  ];

  setMobileMenuOpen(open: boolean) {
    this.mobileMenuOpen = open;
  }

  constructor(private colorService: ColorService) {
    this.colorService.primaryColor$.subscribe(color => this.primaryColor = color);
    this.colorService.secondaryColor$.subscribe(color => this.secondaryColor = color);
    this.colorService.iconLink$.subscribe(link => this.iconLink = link);
  }

  updatePrimaryColor(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.colorService.setPrimaryColor(input.value);
  }

  updateSecondaryColor(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.colorService.setSecondaryColor(input.value);
  }

  updateIconLink(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.colorService.setIconLink(input.value);
  }
  setPageOpen(rota: string): void {
    this.rotaAberta = rota;
  }
}