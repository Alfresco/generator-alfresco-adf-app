import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DocumentlistComponent } from './documentlist.component';
import { PreviewService } from '../services/preview.service';
import { AlfrescoApiServiceMock, AlfrescoApiService, CoreModule, NotificationService,
  TranslateLoaderService, AppConfigService, AppConfigServiceMock } from '@alfresco/adf-core';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentModule, DocumentListService } from '@alfresco/adf-content-services';
import { of } from 'rxjs/internal/observable/of';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

describe('DocumentlistComponent', () => {
  let component: DocumentlistComponent;
  let fixture: ComponentFixture<DocumentlistComponent>;
  let documentListService: DocumentListService;

  const notificationServiceMock = {
    openSnackMessage: jasmine.createSpy('openSnackMessage')
};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        CoreModule.forRoot(),
        ContentModule.forRoot(),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateLoaderService }
        })
      ],
      declarations: [DocumentlistComponent],
      providers: [
        PreviewService,
        { provide: NotificationService, useValue: notificationServiceMock },
        { provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock },
        { provide: AppConfigService, useClass: AppConfigServiceMock }
      ]
    });
    fixture = TestBed.createComponent(DocumentlistComponent);
    documentListService = TestBed.get(DocumentListService);
    component = fixture.componentInstance;
    spyOn(documentListService, 'loadFolderByNodeId').and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
