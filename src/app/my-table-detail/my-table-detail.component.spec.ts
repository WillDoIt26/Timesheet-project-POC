import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTableDetailComponent } from './my-table-detail.component';

describe('MyTableDetailComponent', () => {
  let component: MyTableDetailComponent;
  let fixture: ComponentFixture<MyTableDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTableDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
