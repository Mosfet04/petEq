import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-noticias",
  templateUrl: "./noticias.component.html",
})
export class NoticiasComponent implements OnInit {
  constructor() {}
  pages: number = 10;
  modalSearch: boolean = false;
  toggleModalSearch(){
    this.modalSearch = !this.modalSearch;
  }

  reloadPage(){
    location.reload();
  }
  ngOnInit(): void {}
}
