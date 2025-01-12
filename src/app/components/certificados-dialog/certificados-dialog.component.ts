import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-certificados-dialog',
  templateUrl: './certificados-dialog.component.html'
})
export class CertificadosDialogComponent {
    navigateTo(url: string): void {
        window.location.href = url;
      }
  }