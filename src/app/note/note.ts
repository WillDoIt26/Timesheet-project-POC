import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-note',
  imports: [FormsModule],
  templateUrl: './note.html',
  styleUrl: './note.scss',
})
export class Note {
  notes: string = '';
  private dialogRef = inject(MatDialogRef<Note>)
  
  constructor(
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const savedNotes = localStorage.getItem('savedNotes');
    if (savedNotes) {
      this.notes = savedNotes;
    }
  }

  save(): void {
    localStorage.setItem('savedNotes', this.notes);
    this.dialogRef.close();
  }
}
