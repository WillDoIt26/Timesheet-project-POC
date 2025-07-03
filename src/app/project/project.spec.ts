import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectComponent } from './project';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
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
    expect(component.projects[component.projects.length - 1].status).toBe('pending');
  });
});

