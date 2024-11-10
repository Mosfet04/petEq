import { Component, OnInit, Renderer2, ElementRef, Input } from "@angular/core";
import { ColorService } from 'src/app/services/color.service';
@Component({
  selector: 'background-jorneq-component',
  templateUrl: './background-jorneq-component.component.html',
})
export class BackgroundJorneqComponentComponent implements OnInit {
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
    const div = this.el.nativeElement.querySelector('div[aria-hidden="true"] > div');
    if (div) {
      this.renderer.setStyle(div, 'background-color', this.primaryColor);
    }
  }
  
  ngOnInit(): void 
  { 
    this.updateStyles();
  }
}
