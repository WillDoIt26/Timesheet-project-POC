import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Note } from '../note/note';
@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  constructor(private dialog: MatDialog) {}

  openNoteDialog(): void {
    this.dialog.open(Note, {
      width: '400px',
    });
  }
}
