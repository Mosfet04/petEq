import { Component, OnInit, ChangeDetectionStrategy, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CertificadosDialogComponent } from 'src/app/components/certificados-dialog/certificados-dialog.component';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: "app-auth-navbar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./auth-navbar.component.html",
})
export class AuthNavbarComponent implements OnInit {
  navbarOpen = false;

  constructor() {}

  ngOnInit(): void {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(CertificadosDialogComponent, {
      width: '90%',
      maxWidth: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
