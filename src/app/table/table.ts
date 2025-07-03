import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Note } from '../note/note';
import { Sidebar } from "../sidebar/sidebar";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

interface TimesheetRow {
  project: string;
  description: string;
  days: Record<DayKey, number>;
  notes: string;
  status: string;
  isEditing: boolean;
}

@Component({
  selector: 'app-table',
  imports: [Sidebar,CommonModule,FormsModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})

export class Table {
  constructor(private dialog: MatDialog) {}

  activeTab: string = 'timesheet';

 timesheetRows: TimesheetRow[] = [
    {
      project: '',
      description: '',
      days: {
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
        sat: 0,
        sun: 0,
      },
      notes: '',
      status: 'Draft',
      isEditing: true,
    },
  ];

  submittedTimesheetData: TimesheetRow[] = [];

  openNoteDialog(): void {
    this.dialog.open(Note, {
      width: '400px',
    });
  }

  calculateTotal(row: any): number {
    return Object.values(row.days).reduce((sum: number, val: any) => sum + Number(val), 0);
  }

  saveRow(row: any) {
    row.isEditing = false;
    row.status = 'Saved';
  }

  editRow(row: any) {
    row.isEditing = true;
  }

  submitTimesheet() {
    const savedRows = this.timesheetRows.filter((row) => !row.isEditing);
    this.submittedTimesheetData = [...savedRows];
  }
}
