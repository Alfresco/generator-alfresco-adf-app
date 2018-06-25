import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { AdfModule } from '../adf.module';
import { DocumentlistComponent } from './documentlist.component';
import { PreviewService } from '../services/preview.service';
import { RouterTestingModule } from '@angular/router/testing';

import { AlfrescoApiServiceMock, AlfrescoApiService } from '@alfresco/adf-core';


describe('DocumentlistComponent', () => {
  let component: DocumentlistComponent;
  let fixture: ComponentFixture<DocumentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AdfModule
      ],
      declarations: [DocumentlistComponent],
      providers: [
        PreviewService,
        { provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock },
        { provide: Location, useClass: SpyLocation }
      ]
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
