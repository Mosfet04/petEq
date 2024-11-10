import { Component, OnInit, Renderer2, ElementRef, Input } from "@angular/core";
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: "botao-principal-jorneq",
  templateUrl: "./botao-principal-jorneq.component.html",
})
export class BotaoPrincipalJorneqComponent implements OnInit {
  @Input() link: string = "";
  @Input() text: string = "";
  
  primaryColor: string = '#0891B2';
  secondaryColor: string = '#ff80b5';
  iconLink: string = '#000000';

  constructor(private renderer: Renderer2, private el: ElementRef, private colorService: ColorService) {
    this.colorService.primaryColor$.subscribe(color => {
      this.primaryColor = color;
      this.updateButtonStyles();
    });
    this.colorService.secondaryColor$.subscribe(color => {
      this.secondaryColor = color;
      this.updateButtonStyles();
    });
    this.colorService.iconLink$.subscribe(link => {
      this.iconLink = link;
      this.updateButtonStyles();
    });
  }

  ngOnInit(): void {
    this.updateButtonStyles();
  }

  updateButtonStyles(): void {
    const button = this.el.nativeElement.querySelector('button');
    if (button) {
      this.renderer.setStyle(button, 'background-color', this.primaryColor);
      this.renderer.setStyle(button, 'border-color', this.secondaryColor);
      this.renderer.setStyle(button, 'color', this.iconLink);
    }
  }
}