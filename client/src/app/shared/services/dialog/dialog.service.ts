import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IModalData } from './IModalData';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogs: MatDialogRef<any>[] = [];

  constructor(public dialog: MatDialog) { }

  open(component: any, callback: (...args: any) => void, data?: IModalData) {
    const dialogRef = this.dialog.open(component, { data });
    this.dialogs.push(dialogRef);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      callback(result);
    });
  }

  /**
   * To use this method inside a component:
   * 
   * const dialog = this.dialogService.create(component, { modalData });
   * dialog.componentInstance.onSubmit.subscribe((emittedEventValue => { // do something }));
   */
  create(component: any, data?: IModalData): MatDialogRef<any> {
    const dialogRef = this.dialog.open(component, { data });
    this.dialogs.push(dialogRef);
    return dialogRef;
  }

  closeAllDialogs(): void {
    this.dialog.closeAll();
  }
}
