import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ProjectItem {
  id: number;
  name: string;
  manager: string;
  teamLead: string;
  status: 'approved' | 'pending';
}

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [Sidebar, CommonModule, RouterModule],
  templateUrl: './project.html',
  styleUrls: ['./project.scss']
})

export class ProjectComponent {
  projects: ProjectItem[] = [
    {
      id: 1,
      name: 'Project Alpha',
      manager: 'Alice',
      teamLead: 'Bob',
      status: 'approved'
    },
    {
      id: 2,
      name: 'Project Beta',
      manager: 'Carol',
      teamLead: 'Dave',
      status: 'approved'
    }
  ];

  addProject() {
    const newId = this.projects.length + 1;
    this.projects.push({
      id: newId,
      name: `New Project ${newId}`,
      manager: 'Manager Name',
      teamLead: 'Team Lead Name',
      status: 'pending'
    });
  }
}
