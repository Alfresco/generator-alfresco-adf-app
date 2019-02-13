import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';

import { DocumentlistComponent } from './documentlist.component';
import { PreviewService } from '../services/preview.service';
import { AlfrescoApiServiceMock, AlfrescoApiService, CoreModule, TranslateLoaderService} from '@alfresco/adf-core';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentModule } from '@alfresco/adf-content-services';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

describe('DocumentlistComponent', () => {
  let component: DocumentlistComponent;
  let fixture: ComponentFixture<DocumentlistComponent>;

  beforeEach(async(() => {
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
      declarations: [ DocumentlistComponent ],
      providers: [
        PreviewService,
        {provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock},
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
