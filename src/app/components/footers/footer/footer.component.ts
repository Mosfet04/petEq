import { Component, OnInit, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CertificadosDialogComponent } from 'src/app/components/certificados-dialog/certificados-dialog.component';

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
})
export class FooterComponent implements OnInit {
  date = new Date().getFullYear();

  telefone = window.innerWidth < 770 ? true : false;
  constructor() {}
  readonly dialog = inject(MatDialog);
    openDialog(event) {
      event.preventDefault();
      const dialogRef = this.dialog.open(CertificadosDialogComponent, {
        width: '90%',
        maxWidth: '600px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
  
      });
    }
  ngOnInit(): void {}
}
