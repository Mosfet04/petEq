import { Component } from '@angular/core';

@Component({
  selector: 'app-participe',
  templateUrl: './participe.component.html'
})
export class ParticipeComponent {
  tiers = [
    {
      name: 'Apresente seu trabalho na Jorneq',
      id: 'apresente',
      href: '#',
      price: 'R$ 0,00',
      description: "Apresente seu trabalho na Jorneq e bla bla bla",
      features: ['Ganhe visibilidade em seu trabalho', 'Apresentações serão pontuadas e premiadas'],
      atention: ['Só é possivel apresentar seu trabalho tendo feito a inscrição de participante'],
      featured: false,
    },
    {
      name: 'Participe da Jorneq',
      id: 'participe',
      href: '#',
      price: 'R$ 50',
      description: 'Participe dos eventos da Jorneq e tenha acesso a todas as palestras e workshops.',
      features: [
        'Visualização de palestras',
        'Coffe brakes',
        'Mini-cursos',
        'Workshops',
      ],
      featured: true,
    },
  ];

  classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
}