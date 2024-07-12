import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "pagination",
  templateUrl: "./pagination.component.html",
})
export class PaginationComponent implements OnInit {
  @Input() pages: number;
  stopViewPages: boolean = false;
  currentPage : number = 2;
  range : Array<number> = [];
  rangeLimit : number = 3;
  runUniq : boolean = false;
  getRange(n: number) {
    this.range = Array.from({ length: Math.min(n, this.rangeLimit) }, (_, i) => i + 1);
    if (this.pages > this.range.length) {
      this.stopViewPages = true;
    }
    this.runUniq = true;
  }
  

  toggleLastPage() {
    this.range = Array.from({ length: this.rangeLimit }, (_, i) => this.pages - i)
      .filter(page => page > 0) // Filtra os valores maiores que 0
      .sort((a, b) => a - b); // Ordena em ordem crescente
    this.currentPage = this.pages;
  }
  
  

  toggleFirstPage(){
    this.range = Array.from({ length: Math.min(this.pages, this.rangeLimit) }, (_, i) => i + 1);
    this.currentPage = 1;
  }

  nextPage(){
    if (this.currentPage < this.pages){
      this.currentPage++;
      if (this.currentPage>this.range[this.range.length-1]){
        let emptyArray= [];
        for (let i = 1; i <= this.rangeLimit; i++) {
          if(this.currentPage+i-1 <= this.pages)
            emptyArray.push(this.currentPage+i-1);
        }
        this.range = emptyArray;
      }
    }
  }
  backPage(){
    if (this.currentPage > 1){
      this.currentPage--;
      let emptyArray = [];
      if(this.currentPage<this.range[0]){
        for(let i=1; i<= this.rangeLimit; i++){
          if(this.currentPage-i+1 > 0 )
            emptyArray.push(this.currentPage-i+1);
        }
        this.range = emptyArray.sort();
      }
    }

  }

  constructor() {  }

  ngOnInit(): void {
    if (this.pages > 0 && this.pages !== undefined && !this.runUniq) {
      this.getRange(this.pages);
    }
  }

  

}
