import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentModule } from '@alfresco/adf-content-services';
import { ProcessServicesCloudModule, FormDefinitionSelectorCloudService
} from '@alfresco/adf-process-services-cloud';
import { CoreModule, AppConfigService, AppConfigServiceMock } from '@alfresco/adf-core';
import { StartTaskComponent } from './start-task.component';
import { AlfrescoApiServiceMock, AlfrescoApiService } from '@alfresco/adf-core';
import { of } from 'rxjs';

describe('StartTaskComponent', () => {
  let component: StartTaskComponent;
  let fixture: ComponentFixture<StartTaskComponent>;
  let service: FormDefinitionSelectorCloudService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        CoreModule.forRoot(),
        ContentModule.forRoot(),
        ProcessServicesCloudModule
      ],
      declarations: [StartTaskComponent],
      providers: [
        FormDefinitionSelectorCloudService,
        { provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock },
        { provide: AppConfigService, useClass: AppConfigServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTaskComponent);
    component = fixture.componentInstance;
    service = TestBed.get(FormDefinitionSelectorCloudService);
    spyOn(service, 'getForms').and.returnValue(of([]));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
