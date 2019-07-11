import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentModule } from '@alfresco/adf-content-services';
import { ProcessModule } from '@alfresco/adf-process-services';
import { CoreModule, TranslateLoaderService, AppConfigService, AppConfigServiceMock } from '@alfresco/adf-core';
import { StartProcessComponent } from './start-process.component';
import { AlfrescoApiServiceMock, AlfrescoApiService } from '@alfresco/adf-core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

describe('StartProcessComponent', () => {
  let component: StartProcessComponent;
  let fixture: ComponentFixture<StartProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        CoreModule.forRoot(),
        ContentModule.forRoot(),
        ProcessModule.forRoot(),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateLoaderService }
        })
      ],
      declarations: [StartProcessComponent],
      providers: [
        { provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock },
        { provide: AppConfigService, useClass: AppConfigServiceMock }
      ]
    });
    fixture = TestBed.createComponent(StartProcessComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
