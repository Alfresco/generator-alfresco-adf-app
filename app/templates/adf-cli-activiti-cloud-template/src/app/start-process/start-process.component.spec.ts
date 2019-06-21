import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProcessServicesCloudModule, StartProcessCloudService } from '@alfresco/adf-process-services-cloud';
import { CoreModule } from '@alfresco/adf-core';
import { StartProcessComponent } from './start-process.component';
import { AlfrescoApiServiceMock, AlfrescoApiService, AppConfigService, AppConfigServiceMock } from '@alfresco/adf-core';
import { of } from 'rxjs';

describe('StartProcessComponent', () => {
  let component: StartProcessComponent;
  let startProcessCloudService: StartProcessCloudService;
  let fixture: ComponentFixture<StartProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        CoreModule.forRoot(),
        ProcessServicesCloudModule
      ],
      declarations: [StartProcessComponent],
      providers: [
        StartProcessCloudService,
        { provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock },
        { provide: AppConfigService, useClass: AppConfigServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartProcessComponent);
    component = fixture.componentInstance;
    startProcessCloudService = TestBed.get(StartProcessCloudService);
    spyOn(startProcessCloudService, 'getProcessDefinitions').and.returnValue(of([]));
    spyOn(startProcessCloudService, 'startProcess').and.returnValue(of([]));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
