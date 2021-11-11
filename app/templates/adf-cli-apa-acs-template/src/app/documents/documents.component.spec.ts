import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentModule, DocumentListService } from '@alfresco/adf-content-services';
import { ProcessServicesCloudModule } from '@alfresco/adf-process-services-cloud';
import { CoreModule, AppConfigService, AppConfigServiceMock, TranslateLoaderService, NotificationService } from '@alfresco/adf-core';
import { DocumentsComponent } from './documents.component';
import { PreviewService } from '../services/preview.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AlfrescoApiServiceMock, AlfrescoApiService } from '@alfresco/adf-core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('DocumentsComponent', () => {
  let component: DocumentsComponent;
  let fixture: ComponentFixture<DocumentsComponent>;
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
        ProcessServicesCloudModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateLoaderService }
        })
      ],
      declarations: [DocumentsComponent],
      providers: [
        PreviewService,
        { provide: NotificationService, useValue: notificationServiceMock },
        { provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock },
        { provide: AppConfigService, useClass: AppConfigServiceMock }
      ]
    });
    fixture = TestBed.createComponent(DocumentsComponent);
    documentListService = TestBed.inject(DocumentListService);
    component = fixture.componentInstance;
    spyOn(documentListService, 'loadFolderByNodeId').and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
