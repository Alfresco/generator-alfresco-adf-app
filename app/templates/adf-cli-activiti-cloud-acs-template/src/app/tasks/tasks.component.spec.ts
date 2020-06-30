import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProcessServicesCloudModule, TaskListCloudService } from '@alfresco/adf-process-services-cloud';
import { CoreModule, AppConfigService, AppConfigServiceMock, TranslationService, TranslationMock } from '@alfresco/adf-core';
import { TasksComponent } from './tasks.component';
import { AlfrescoApiServiceMock, AlfrescoApiService } from '@alfresco/adf-core';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let alfrescoApiService: AlfrescoApiService;
  let taskListCloudService: TaskListCloudService;

  const fakeTaskCloudList = {
    list: {
      entries: [],
      pagination: {
        skipCount: 0,
        maxItems: 15,
        count: 0,
        hasMoreItems: false,
        totalItems: 0
      }
    }
  };

  const oauth2AuthMock = {
    oauth2Auth: {
      callCustomApi: () => {
        return Promise.resolve({});
      }
    },
    isEcmBpmConfiguration: () => false,
    isEcmConfiguration: () => false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        CoreModule.forRoot(),
        ProcessServicesCloudModule
      ],
      declarations: [TasksComponent],
      providers: [
        { provide: AppConfigService, useClass: AppConfigServiceMock },
        { provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock },
        { provide: TranslationService, useClass: TranslationMock }
      ]
    });

    fixture = TestBed.createComponent(TasksComponent);
    alfrescoApiService = TestBed.get(AlfrescoApiService);
    taskListCloudService = TestBed.get(TaskListCloudService);
    component = fixture.componentInstance;
    spyOn(alfrescoApiService, 'getInstance').and.returnValue(oauth2AuthMock);
    spyOn(taskListCloudService, 'getTaskByRequest').and.returnValue(of(fakeTaskCloudList));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
