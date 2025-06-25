import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Note } from '../note/note';
import { Sidebar } from "../sidebar/sidebar";
@Component({
  selector: 'app-table',
  imports: [Sidebar],
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
