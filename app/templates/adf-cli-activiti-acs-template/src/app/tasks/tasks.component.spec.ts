import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentModule } from '@alfresco/adf-content-services';
import { ProcessServicesCloudModule } from '@alfresco/adf-process-services-cloud';
import { CoreModule, AppConfigService, AppConfigServiceMock, TranslateLoaderService } from '@alfresco/adf-core';
import { TasksComponent } from './tasks.component';
import { AlfrescoApiServiceMock, AlfrescoApiService } from '@alfresco/adf-core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let alfrescoApiService: AlfrescoApiService;

  const fakeTaskCloudList = {
    list: {
      entries: [],
      pagination: {
        skipCount: 0,
        maxItems: 10,
        count: 0,
        hasMoreItems: false,
        totalItems: 0
      }
    }
  };

  const mock = {
    oauth2Auth: {
      callCustomApi: () => Promise.resolve(fakeTaskCloudList)
    }
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
      declarations: [TasksComponent],
      providers: [
        { provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock },
        { provide: AppConfigService, useClass: AppConfigServiceMock }
      ]
    });

    fixture = TestBed.createComponent(TasksComponent);
    alfrescoApiService = TestBed.get(AlfrescoApiService);
    component = fixture.componentInstance;
    spyOn(alfrescoApiService, 'getInstance').and.returnValue(mock);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
