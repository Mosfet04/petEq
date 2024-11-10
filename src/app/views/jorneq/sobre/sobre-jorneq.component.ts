import { Component, OnInit, Renderer2, ElementRef, Input } from "@angular/core";
import { ColorService } from 'src/app/services/color.service';
@Component({
  selector: 'app-sobre-jorneq',
  templateUrl: './sobre-jorneq.component.html'
})
export class SobreJorneqComponent implements OnInit {
  telefone = window.innerWidth < 770 ? true : false;
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

  primaryColor: string = '#0891B2';
  secondaryColor: string = '#ff80b5';
  iconLink: string = '#000000';

  updateStyles(): void {
    const h2 = this.el.nativeElement.querySelector('h2.text-base.font-semibold.leading-7.text-cyan-600');
    const card1 = this.el.nativeElement.querySelector('#card1');
    const card2 = this.el.nativeElement.querySelector('#card2');
    const card3 = this.el.nativeElement.querySelector('#card3');
    const card4 = this.el.nativeElement.querySelector('#card4');
    if (h2) {
      this.renderer.setStyle(h2, 'color', this.primaryColor);
    }
    if (card1) {
      this.renderer.setStyle(card1, 'background-color', this.secondaryColor);
    }
    if (card2) {
      this.renderer.setStyle(card2, 'background-color', this.secondaryColor);
    }
    if (card3) {
      this.renderer.setStyle(card3, 'background-color', this.secondaryColor);
    }
    if (card4) {
      this.renderer.setStyle(card4, 'background-color', this.secondaryColor);
    }
  }
  
  ngOnInit(): void 
  { 
    this.updateStyles();
  }
}