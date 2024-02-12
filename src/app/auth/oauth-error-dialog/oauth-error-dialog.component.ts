import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-oauth-error-dialog',
  templateUrl: './oauth-error-dialog.component.html',
  styleUrls: ['./oauth-error-dialog.component.css']
})
export class OauthErrorDialogComponent {
  constructor(
      public dialogRef: MatDialogRef<OauthErrorDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

}
