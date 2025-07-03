import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../note/note';
import { Sidebar } from '../sidebar/sidebar';
import { RouterModule } from '@angular/router';

interface TimesheetEntry {
  projectType: string;
  description: string;
  hours: number[];
  total: number;
  status: 'Approved' | 'Pending' | 'Not Started';
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar,RouterModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table implements OnInit {
  weekLabels: string[] = [];
  weekRange: string = '';
  selectedDate: Date = new Date();

  timesheetData: TimesheetEntry[] = [
    {
      projectType: 'Billable',
      description: 'Development',
      hours: [8, 0, 0, 0, 0, 0, 0],
      total: 8,
      status: 'Approved',
    },
    {
      projectType: 'Non-Billable',
      description: 'Testing',
      hours: [0, 0, 0, 0, 0, 0, 0],
      total: 0,
      status: 'Pending',
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.setCurrentWeek(this.selectedDate);
  }

  setCurrentWeek(baseDate: Date): void {
  this.selectedDate = baseDate;

  const day = baseDate.getDay();
  const monday = new Date(baseDate);
  const offset = day === 0 ? -6 : 1 - day;
  monday.setDate(baseDate.getDate() + offset);

  this.weekLabels = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
  });

  this.weekRange = `${this.weekLabels[0]} - ${this.weekLabels[6]}`;
}


  changeWeek(offsetDays: number): void {
  const newDate = new Date(this.selectedDate); // copy date
  newDate.setDate(newDate.getDate() + offsetDays);
  this.setCurrentWeek(newDate);
}


  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const date = new Date(input.value);
    this.setCurrentWeek(date);
  }

  goToToday(): void {
    this.setCurrentWeek(new Date());
  }

  openNoteDialog(): void {
    this.dialog.open(Note, { width: '400px' });
  }

  addProjectRow(): void {
    this.timesheetData.push({
      projectType: '',
      description: '',
      hours: [0, 0, 0, 0, 0, 0, 0],
      total: 0,
      status: 'Not Started',
    });
  }

  removeProject(index: number): void {
    this.timesheetData.splice(index, 1);
  }

  updateTotal(entry: TimesheetEntry): void {
    const total = entry.hours.reduce((sum, h) => sum + Number(h || 0), 0);
    entry.total = total;
    entry.status = total > 0 ? 'Pending' : 'Not Started';
  }

  getDailyTotals(): number[] {
    const totals = Array(7).fill(0);
    for (const entry of this.timesheetData) {
      entry.hours.forEach((h, i) => {
        totals[i] += Number(h || 0);
      });
    }
    return totals;
  }
}
