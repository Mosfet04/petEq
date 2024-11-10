import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-participe',
  templateUrl: './participe.component.html'
})
export class ParticipeComponent implements OnInit, AfterViewInit {
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
  primaryColor: string = '#0891B2';
  secondaryColor: string = '#ff80b5';
  iconLink: string = '#000000';

  constructor(private renderer: Renderer2, private el: ElementRef, private colorService: ColorService) {
    this.colorService.primaryColor$.subscribe(color => {
      this.primaryColor = color;
      this.updateStyles();
    });
    this.colorService.secondaryColor$.subscribe(color => {
      this.secondaryColor = color;
      this.updateStyles();
    });
    this.colorService.iconLink$.subscribe(link => {
      this.iconLink = link;
      this.updateStyles();
    });
  }

  ngOnInit(): void {
    this.updateStyles();
  }

  ngAfterViewInit(): void {
    this.updateStyles();
  }

  updateStyles(): void {
    const subtitle = this.el.nativeElement.querySelector('#subtitle');
    if (subtitle) {
      this.renderer.setStyle(subtitle, 'color', this.primaryColor);
    }

    this.tiers.forEach((tier, index) => {
      const card = this.el.nativeElement.querySelector(`#card${index}`);
      const botao = this.el.nativeElement.querySelector(`#botao${index}`);
      const h3 = this.el.nativeElement.querySelector(`#${tier.id}`);
      if (card) {
        this.renderer.setStyle(card, 'background-color', tier.featured ? this.secondaryColor : 'white');
      }
      if (h3) {
        this.renderer.setStyle(h3, 'color', this.primaryColor);
      }
      if (botao) {
        this.renderer.setStyle(botao, 'background-color', tier.featured ? this.primaryColor : '');
        this.renderer.setStyle(botao, 'border-color', this.primaryColor);
        this.renderer.setStyle(botao, 'box-shadow', tier.featured ? '' : `0 0 0 1px ${this.primaryColor}`);
        this.renderer.setStyle(botao, 'color', tier.featured ? '' : this.primaryColor);
      }
    });
  }

  classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
}