import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdfModule } from '../adf.module';
import { DocumentlistComponent } from './documentlist.component';

describe('DocumentlistComponent', () => {
  let component: DocumentlistComponent;
  let fixture: ComponentFixture<DocumentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AdfModule
      ],
      declarations: [ DocumentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
