import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdfModule } from '../adf.module';
import { DatatableComponent } from './datatable.component';

describe('DatatableComponent', () => {
  let component: DatatableComponent;
  let fixture: ComponentFixture<DatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AdfModule
      ],
      declarations: [ DatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
