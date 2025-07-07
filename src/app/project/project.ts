import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';

interface ProjectInfo {
  name: string;
  logoUrl: string; // Placeholder for now
  manager: string;
  teamLead: string;
  status: 'Approved' | 'Pending';
}

@Component({
  selector: 'app-project',
   imports: [CommonModule,Sidebar, FormsModule],
  templateUrl: './project.html',
  styleUrls: ['./project.scss']
})
export class Project {
  projects: ProjectInfo[] = [
    {
      name: 'Slipstream',
      logoUrl: 'https://tse2.mm.bing.net/th/id/OIP.8_IPFUVs9j--aeZ8nJQZVwAAAA?r=0&pid=ImgDet&w=150&h=150&c=7&dpr=1.3&o=7&rm=3://media-exp1.licdn.com/dms/image/C560BAQF46uKEa24-Cg/company-logo_200_200/0/1657222607808?e=2147483647&v=beta&t=IGJGwrMUzhLPeYFbjNH6tb9Yfs2vnhIBxv7aCzf2Hls',
      manager: 'Alice Smith',
      teamLead: 'Bob Johnson',
      status: 'Approved'
    },
    {
      name: 'PSA BDP',
      logoUrl: 'https://th.bing.com/th/id/OIP.x5oU8ZLsFIvEXILhMQAW5QHaEy?w=239&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      manager: 'Carol White',
      teamLead: 'David Brown',
      status: 'Approved'
    }
  ];

  addProject() {
    this.projects.push({
      name: 'New Project',
      logoUrl: '',
      manager: 'Pending',
      teamLead: 'Pending',
      status: 'Pending'
    });
  }
}

