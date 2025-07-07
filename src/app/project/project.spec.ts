import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Project } from './project';

describe('Project', () => {
  let component: Project;
  let fixture: ComponentFixture<Project>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [Project]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Project);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new pending project', () => {
    const initialCount = component.projects.length;
    component.addProject();
    expect(component.projects.length).toBe(initialCount + 1);
    expect(component.projects[component.projects.length - 1].status).toBe('Pending');
  });
});
