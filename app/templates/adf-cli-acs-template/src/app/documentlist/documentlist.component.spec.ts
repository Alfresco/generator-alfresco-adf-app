import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DocumentlistComponent } from './documentlist.component';
import { PreviewService } from '../services/preview.service';
import { AlfrescoApiServiceMock, AlfrescoApiService, CoreModule, NotificationService } from '@alfresco/adf-core';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentModule, DocumentListService } from '@alfresco/adf-content-services';
import { of } from 'rxjs/internal/observable/of';

describe('DocumentlistComponent', () => {
  let component: DocumentlistComponent;
  let fixture: ComponentFixture<DocumentlistComponent>;
  let documentListService: DocumentListService;

  const notificationServiceMock = {
    openSnackMessage: jasmine.createSpy('openSnackMessage')
};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        CoreModule.forRoot(),
        ContentModule.forRoot()
      ],
      declarations: [DocumentlistComponent],
      providers: [
        PreviewService,
        { provide: NotificationService, useValue: notificationServiceMock },
        { provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentlistComponent);
    documentListService = TestBed.get(DocumentListService);
    component = fixture.componentInstance;

    spyOn(documentListService, 'loadFolderByNodeId').and.returnValue(of([]));
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
